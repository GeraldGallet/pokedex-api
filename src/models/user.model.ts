import { UserId } from 'src/entities';
import { PlainPokemonModel } from 'src/models/pokemon.model';

export type UserPokemonModel = PlainPokemonModel & { surname: string };

export type UserModel = {
  id: UserId;
  firstName: string;
  lastName: string;
  pokemons: UserPokemonModel[];
};
