import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CardEntity } from '../../model/card.entity';
import { CardDto } from './card.dto';

@Injectable()
export class CardService {
  private readonly logger = new Logger(CardService.name);
  constructor(
    @InjectRepository(CardEntity)
    private readonly cardRepository: Repository<CardEntity>,
  ) {}

  public async getAll(): Promise<CardDto[]> {
    let cards: CardEntity[];
    try {
      cards = await this.cardRepository.find();
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
    return cards.map(card => CardDto.fromEntity(card));
  }

  // todo: add roomDTO
  public async create(cardDto: CardDto, room): Promise<CardDto> {
    let newCard: CardEntity;
    try {
      newCard = await this.cardRepository.save(cardDto.toEntity(room));
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
    return CardDto.fromEntity(newCard);
  }
}
