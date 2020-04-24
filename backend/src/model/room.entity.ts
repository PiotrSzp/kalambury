import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { CardEntity } from './card.entity';
import {PlayerEntity} from './player.entity';

@Entity({ name: 'room' })
export class RoomEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'varchar', length: 4 })
  pin: string;

  @OneToMany(
    type => CardEntity,
    card => card.room,
  )
  cards: CardEntity[];

  @OneToMany(
    type => PlayerEntity,
    player => player.room,
  )
  players: PlayerEntity[];
}
