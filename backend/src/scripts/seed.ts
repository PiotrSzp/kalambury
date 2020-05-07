import { ConnectionOptions, createConnection } from 'typeorm';
import { CardEntity } from '../model/card.entity';
import { RoomEntity } from '../model/room.entity';
import { configService } from '../config/config.service';
import { CardService } from '../modules/card/card.service';
import { CardDto } from '../modules/card/card.dto';
import { RoomService } from '../modules/room/room.service';

const run = async () => {
  const opt = {
    ...configService.getTypeOrmConfig(),
    debug: true,
  };
  const connection = await createConnection(opt as ConnectionOptions);

  const roomService = new RoomService(connection.getRepository(RoomEntity));

  // TODO: add roomDto
  const seedRoomDto1: RoomEntity = {
    id: '123e4567-e89b-12d3-a456-426655440000',
    name: 'Seed Room No 1',
    pin: '1234',
    createDateTime: new Date(),
    cards: [],
    players: [],
  };

  const seedRoomDto2: RoomEntity = {
    id: '123e4567-e89b-12d3-a456-426655440040',
    name: 'Seed Room No 2',
    pin: '1234',
    createDateTime: new Date(),
    cards: [],
    players: [],
  };

  const seedRoom1 = await roomService.create(seedRoomDto1);
  const seedRoom2 = await roomService.create(seedRoomDto2);

  const seedId = Date.now()
    .toString()
    .split('')
    .reverse()
    .reduce((s, it, x) => (x > 3 ? s : (s += it)), '');

  const cardService = new CardService(connection.getRepository(CardEntity));

  const work = [];

  for (let i = 0; i < 10; i++) {
    const cardDto = CardDto.from({
      value: `Seeded value no ${i}`,
    });
    const cardPromise = cardService.create(cardDto, seedRoom1);

    work.push(cardPromise);
  }

  return await Promise.all(work);
};

run();
