import {Injectable, Logger} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomEntity } from '../../model/room.entity';
import {CardDto} from '../card/card.dto';
import {CardEntity} from '../../model/card.entity';

@Injectable()
export class RoomService {
  private readonly logger = new Logger(RoomService.name);
  constructor(
    @InjectRepository(RoomEntity)
    private readonly roomRepository: Repository<RoomEntity>,
  ) {}

  public async getAll(): Promise<RoomEntity[]> {
    return await this.roomRepository.find();
  }

  // todo: add roomDto
  public async create(roomDto): Promise<any> {
    let newRoom: CardEntity;
    try {
      newRoom = await this.roomRepository.save(roomDto);
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
    // return RoomDto.fromEntity(newRoom);
    return newRoom;
  }
}
