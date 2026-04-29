import { Module } from '@nestjs/common';
import { PrismaModule } from './providers/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { EventsModule } from './modules/events/events.module';

@Module({
  imports: [PrismaModule, AuthModule, EventsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
