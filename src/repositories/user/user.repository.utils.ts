import { User } from 'src/entities';
import { adaptPokemonToPlainPokemonRepositoryOutput } from 'src/repositories/pokemon/pokemon.repository.utils';
import { UserRepositoryOutput } from 'src/repositories/user/user.repository.type';

export const adaptUserEntityToUserModel = (
  user: User,
): UserRepositoryOutput => ({
  ...user,
  pokemons: user.pokemons.map((userPokemon) => ({
    ...adaptPokemonToPlainPokemonRepositoryOutput(userPokemon.pokemon),
    surname: userPokemon.surname,
  })),
});
