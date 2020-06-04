import {ApiModelProperty} from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import {IsInstance, IsString, IsUUID} from 'class-validator';
import {CardEntity} from '../../model/card.entity';
import {PlayerEntity} from '../../model/player.entity';
import {RoomEntity} from '../../model/room.entity';
import {GameState} from '../../consts';

export class RoomDto implements Readonly<RoomDto> {
  @ApiModelProperty({ required: true })
  @IsUUID()
  id: string;

  @ApiModelProperty({ required: true })
  @IsString()
  pin: string;

  @ApiModelProperty({ required: true })
  @IsString()
  name: string;

  @ApiModelProperty({ required: true })
  @IsString()
  config: string;

  @ApiModelProperty({ required: true })
  @IsInstance(CardEntity)
  cards: CardEntity[];

  @ApiModelProperty({ required: true })
  @IsInstance(PlayerEntity)
  players: PlayerEntity[];

  public static from(dto: Partial<RoomDto>) {
    const room = new RoomDto();
    room.id = dto.id;
    room.pin = dto.pin;
    room.name = dto.name;
    room.config = dto.config;
    room.cards = dto.cards;
    room.players = dto.players;
    return room;
  }

  public static fromEntity(entity: RoomEntity): RoomDto {
    return this.from({
      id: entity.id,
      name: entity.name,
      // pin: entity.pin,
      config: entity.config,
      players: entity.players,
      cards: entity.cards,
    });
  }

  public toEntity(state?: GameState, players?: PlayerEntity[], cards?: CardEntity[]): RoomEntity {
    const room = new RoomEntity();
    room.id = this.id;
    room.pin = this.pin;
    room.config = this.config;
    room.cards = cards;
    room.players = players;
    room.state = state || GameState.SETUP;
    return room;
  }
}
