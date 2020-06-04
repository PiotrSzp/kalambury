import {
  Body,
  Controller,
  Get,
  Post,
  Param,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomEntity } from '../../model/room.entity';
import {RoomDto} from './room.dto';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  public async getAll(): Promise<RoomDto[]> {
    return await this.roomService.getAll();
  }

  @Get(':id')
  public async getOne(@Param('id') id: string): Promise<RoomEntity> {
    return await this.roomService.getOne(id);
  }

  @Post('login')
  public async verifyPin(@Body() body): Promise<void> {
    return await this.roomService.verifyPin(body.pin, body.roomId);
  }

  @Post()
  public async create(@Body() data): Promise<RoomDto> {
    return await this.roomService.create(data);
  }
}
