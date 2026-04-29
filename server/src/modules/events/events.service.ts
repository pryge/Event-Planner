import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../providers/prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Importance } from '@prisma/client';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateEventDto) {
    return this.prisma.event.create({
      data: { ...dto, userId },
    });
  }

  async findAll(userId: string, importance?: Importance, search?: string) {
    return this.prisma.event.findMany({
      where: {
        userId,
        ...(importance && { importance }),
        ...(search && {
          title: { contains: search, mode: 'insensitive' },
        }),
      },
      orderBy: { date: 'asc' },
    });
  }

  async findOne(userId: string, id: string) {
    const event = await this.prisma.event.findFirst({
      where: { id, userId },
    });
    if (!event) throw new NotFoundException('Подію не знайдено');
    return event;
  }

  async update(userId: string, id: string, dto: UpdateEventDto) {
    await this.findOne(userId, id);
    return this.prisma.event.update({
      where: { id },
      data: dto,
    });
  }

  async remove(userId: string, id: string) {
    await this.findOne(userId, id);
    return this.prisma.event.delete({ where: { id } });
  }
}
