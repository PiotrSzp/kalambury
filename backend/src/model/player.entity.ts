import { Entity, Column, ManyToOne, Unique, Index } from 'typeorm';
import { BaseEntity } from './base.entity';
import { RoomEntity } from './room.entity';
import { Teams } from '../consts';

@Entity({ name: 'player' })
@Unique(['name'])
export class PlayerEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 300 })
  name: string;

  @Column({type: 'varchar'})
  socket: string;

  @Column({type: 'boolean'})
  online: boolean;

  @Column({type: 'boolean'})
  ready: boolean;

  @Column({type: 'varchar'})
  team: Teams;

  @Index()
  @ManyToOne((type) => RoomEntity, (room) => room.players)
  room: RoomEntity;
}
