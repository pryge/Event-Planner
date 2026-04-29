import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './providers/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { EventsModule } from './modules/events/events.module';

@Module({
  imports: [PrismaModule, AuthModule, EventsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
