import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotAcceptableException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomEntity } from '../../model/room.entity';
import { RoomDto } from './room.dto';
import { GameState } from '../../consts';

@Injectable()
export class RoomService {
  private readonly logger = new Logger(RoomService.name);
  constructor(
    @InjectRepository(RoomEntity)
    private readonly roomRepository: Repository<RoomEntity>,
  ) {}

  public async getAll(): Promise<RoomDto[]> {
    const rooms = await this.roomRepository.find();
    return rooms.map((room) => RoomDto.fromEntity(room));
  }

  public async getOne(id: string): Promise<RoomEntity> {
    let room: RoomEntity;
    try {
      room = await this.roomRepository.findOne(id);
    } catch (e) {
      this.logger.error(e.message);
    }
    if (room) {
      return room;
    } else {
      throw new HttpException(`Room ${id} not found`, HttpStatus.NOT_FOUND);
    }
  }

  public async create(roomDto: RoomDto): Promise<RoomDto> {
    let newRoom: RoomEntity;
    try {
      newRoom = await this.roomRepository.save(
        roomDto.toEntity(),
      );
    } catch (error) {
      this.logger.error(error.message);
      if (error.code === '23505') {
        throw new NotAcceptableException(error);
      } else {
        throw error;
      }
    }
    return RoomDto.fromEntity(newRoom);
  }

  public async verifyPin(pin, roomId): Promise<void> {
    const room = await this.getOne(roomId);
    this.logger.debug(pin, roomId);
    if (room.pin !== pin) {
      throw new HttpException('Invalid PIN', HttpStatus.FORBIDDEN);
    }
  }
}
