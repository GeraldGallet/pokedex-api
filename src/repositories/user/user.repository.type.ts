import { PokemonId, UserId } from 'src/entities';
import { UserModel } from 'src/models/user.model';

export type UserRepositoryOutput = UserModel;

export type CreateUserRepositoryInput = Pick<
  UserModel,
  'firstName' | 'lastName'
>;

export type UpdateUserRepositoryInput = {
  firstName?: string;
  lastName?: string;
};

export type CapturePokemonRepositoryInput = {
  userId: UserId;
  pokemonId: PokemonId;
  surname?: string;
};
