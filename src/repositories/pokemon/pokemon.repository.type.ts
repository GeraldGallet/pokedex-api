import { PlainPokemonModel } from 'src/models';

export type PlainPokemonRepositoryOutput = PlainPokemonModel;
export type CreatePokemonRepositoryInput = Omit<PlainPokemonModel, 'id'>;
export type UpdatePokemonRepositoryInput = Partial<
  Omit<PlainPokemonModel, 'id'>
>;
