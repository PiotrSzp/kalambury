import { Controller, Get } from '@nestjs/common';
import { PlayerService } from './player.service';
import { PlayerEntity } from '../../model/player.entity';

@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Get()
  public getAll(): Promise<PlayerEntity[]> {
    return this.playerService.getAll();
  }
}
