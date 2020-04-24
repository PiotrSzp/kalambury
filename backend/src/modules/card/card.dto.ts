import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsInstance, IsString, IsUUID } from 'class-validator';
import { RoomEntity } from '../../model/room.entity';
import { CardEntity } from '../../model/card.entity';

export class CardDto implements Readonly<CardDto> {
  @ApiModelProperty({ required: true })
  @IsUUID()
  id: string;

  @ApiModelProperty({ required: true })
  @IsString()
  value: string;

  @ApiModelProperty({ required: true })
  @IsInstance(RoomEntity)
  room: RoomEntity;

  public static from(dto: Partial<CardDto>) {
    const card = new CardDto();
    card.id = dto.id;
    card.value = dto.value;
    card.value = dto.value;
    card.room = dto.room;
    return card;
  }

  public static fromEntity(entity: CardEntity) {
    return this.from({
      id: entity.id,
      value: entity.value,
      room: entity.room,
    });
  }

  public toEntity(room: RoomEntity) {
    const card = new CardEntity();
    card.id = this.id;
    card.value = this.value;
    card.room = room;
    card.createDateTime = new Date();
    return card;
  }
}
