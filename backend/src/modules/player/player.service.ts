import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {PlayerEntity} from '../../model/player.entity';

@Injectable()
export class PlayerService {
    constructor(
        @InjectRepository(PlayerEntity)
        private readonly playerRepository: Repository<PlayerEntity>,
    ) {}

    public async getAll(): Promise<PlayerEntity[]> {
        return await this.playerRepository.find();
    }
}
