import { faker } from '@faker-js/faker';
import { Pokemon, PokemonId } from 'src/entities';
import { typeFixture } from 'src/fixtures/type.fixture';

export const pokemonFixture = (): Pokemon =>
  ({
    id: faker.string.uuid() as PokemonId,
    name: faker.string.sample(8),
    identifier: faker.number.int(),
    types: [
      { type: typeFixture() },
      { type: typeFixture() },
      { type: typeFixture() },
    ],
  }) as Pokemon;
