import { Module } from '@nestjs/common';
import { Game } from './game';

@Module({
  providers: [Game]
})
export class GameModule {}
