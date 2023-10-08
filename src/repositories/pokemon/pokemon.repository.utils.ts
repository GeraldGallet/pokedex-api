import { Pokemon } from 'src/entities';
import { PlainPokemonRepositoryOutput } from 'src/repositories/pokemon/pokemon.repository.type';

export const adaptPokemonToPlainPokemonRepositoryOutput = (
  data: Pokemon,
): PlainPokemonRepositoryOutput => ({
  ...data,
  types: data.types.map(({ type }) => type.name),
});
