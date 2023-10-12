import { PlainPokemonModel } from 'src/models';

export type PlainPokemonRepositoryOutput = PlainPokemonModel;

export type UpdatePokemonRepositoryInput = Partial<
  Omit<PlainPokemonModel, 'id'>
>;
