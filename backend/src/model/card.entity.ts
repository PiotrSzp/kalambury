import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { RoomEntity } from './room.entity';

@Entity({ name: 'card' })
export class CardEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 300 })
  value: string;

  @ManyToOne(
    type => RoomEntity,
    room => room.cards,
  )
  room: RoomEntity;
}
