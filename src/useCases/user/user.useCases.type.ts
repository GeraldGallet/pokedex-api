import { UserModel } from 'src/models/user.model';
import {
  CapturePokemonRepositoryInput,
  CreateUserRepositoryInput,
  UpdateUserRepositoryInput,
} from 'src/repositories';

export type UserUseCasesOutput = UserModel;

export type CreateUserUseCasesInput = CreateUserRepositoryInput;

export type UpdateUserUseCasesInput = UpdateUserRepositoryInput;

export type CapturePokemonUseCasesInput = CapturePokemonRepositoryInput;
