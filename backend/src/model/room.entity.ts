import { Entity, Column, OneToMany, Unique } from 'typeorm';
import { BaseEntity } from './base.entity';
import { CardEntity } from './card.entity';
import { PlayerEntity } from './player.entity';
import { GameState } from '../consts';

@Entity({ name: 'room' })
@Unique(['name'])
export class RoomEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'varchar', length: 4 })
  pin: string;

  @Column({ type: 'varchar' })
  config: string;

  @Column({ type: 'varchar' })
  state: GameState;

  @OneToMany((type) => CardEntity, (card) => card.room)
  cards: CardEntity[];

  @OneToMany((type) => PlayerEntity, (player) => player.room)
  players: PlayerEntity[];
}
