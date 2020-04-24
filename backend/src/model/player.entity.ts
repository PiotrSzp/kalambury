import {Entity, Column, ManyToOne} from 'typeorm';
import { BaseEntity } from './base.entity';
import {RoomEntity} from './room.entity';

@Entity({ name: 'player' })
export class PlayerEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 300 })
  name: string;

  @ManyToOne(
      type => RoomEntity,
      room => room.players,
  )
  room: RoomEntity;
}
