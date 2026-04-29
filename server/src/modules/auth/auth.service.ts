import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../providers/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exist');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        name: dto.name,
      },
    });

    const { password: _, ...result } = user;
    return result;
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user || !user.password) {
      throw new UnauthorizedException('Wrong email or password');
    }
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Wrong email or password');
    }
    const token = this.jwt.sign({ sub: user.id, email: user.email });
    return { access_token: token };
  }

  async getMe(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });
    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async validateGoogleUser(details: {
    googleId: string;
    email: string;
    name: string;
  }) {
    let user = await this.prisma.user.findUnique({
      where: { email: details.email },
    });

    if (user) {
      if (!user.googleId) {
        user = await this.prisma.user.update({
          where: { email: details.email },
          data: { googleId: details.googleId },
        });
      }
      return user;
    }

    user = await this.prisma.user.create({
      data: {
        email: details.email,
        name: details.name,
        googleId: details.googleId,
        password: null,
      },
    });

    return user;
  }

  googleLogin(user: any) {
    if (!user) {
      throw new UnauthorizedException('No user from google');
    }

    const token = this.jwt.sign({ sub: user.id, email: user.email });
    return {
      access_token: token,
      user,
    };
  }
}
