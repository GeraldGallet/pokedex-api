import { PlainPokemonModel } from 'src/models';
import {
  CreatePokemonRepositoryInput,
  UpdatePokemonRepositoryInput,
} from 'src/repositories';

export type PlainPokemonUseCasesOutput = PlainPokemonModel;
export type CreatePokemonUseCasesInput = Omit<
  CreatePokemonRepositoryInput,
  'identifier'
>;
export type UpdatePokemonUseCasesInput = UpdatePokemonRepositoryInput;
