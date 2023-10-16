import { faker } from '@faker-js/faker';
import { Type } from 'src/entities';

export const typeFixture = (): Type =>
  ({
    id: faker.string.uuid(),
    name: faker.string.sample(8),
  }) as Type;
