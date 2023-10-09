import { PokemonId } from 'src/entities';

export type PlainPokemonModel = {
  id: PokemonId;

  evolvesTo?: PokemonId;
  identifier: number;
  name: string;
  types: string[];
};
