import { PokemonId } from 'src/entities';

export type PlainPokemonModel = {
  id: PokemonId;

  name: string;
  types: string[];
  evolvesTo?: PokemonId;
};
