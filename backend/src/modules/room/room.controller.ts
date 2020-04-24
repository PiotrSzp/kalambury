import { Controller, Get } from '@nestjs/common';
import { RoomService } from './room.service';
import {RoomEntity} from '../../model/room.entity';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  public async getAll(): Promise<RoomEntity[]> {
      return await this.roomService.getAll();
  }
}
