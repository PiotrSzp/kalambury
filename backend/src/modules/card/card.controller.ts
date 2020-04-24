import { Controller, Get } from '@nestjs/common';
import { CardService } from './card.service';
import {CardDto} from './card.dto';

@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Get()
  public getAll(): Promise<CardDto[]> {
    return this.cardService.getAll();
  }
}
