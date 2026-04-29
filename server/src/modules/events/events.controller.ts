import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { EventsService } from './events.service';
import { CurrentUser } from '../../common/decorators/user.decorator';
import { CreateEventDto } from './dto/create-event.dto';
import { Importance } from '@prisma/client';
import { UpdateEventDto } from './dto/update-event.dto';

@Controller('events')
@UseGuards(JwtAuthGuard)
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Post()
  create(@CurrentUser() user, @Body() dto: CreateEventDto) {
    return this.eventsService.create(user.sub, dto);
  }

  @Get()
  findAll(
    @CurrentUser() user,
    @Query('importance') Importance?: Importance,
    @Query('search') search?: string,
  ) {
    return this.eventsService.findAll(user.sub, Importance, search);
  }

  @Get(':id')
  findOne(@CurrentUser() user, @Param('id') id: string) {
    return this.eventsService.findOne(user.sub, id);
  }
  @Patch(':id')
  update(
    @CurrentUser() user,
    @Param('id') id: string,
    @Body() dto: UpdateEventDto,
  ) {
    return this.eventsService.update(user.sub, id, dto);
  }
  @Delete(':id')
  remove(@CurrentUser() user, @Param('id') id: string) {
    return this.eventsService.remove(user.sub, id);
  }
}
