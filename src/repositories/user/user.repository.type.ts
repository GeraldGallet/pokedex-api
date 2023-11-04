import { UserModel } from 'src/models/user.model';

export type UserRepositoryOutput = UserModel;

export type CreateUserRepositoryInput = Pick<
  UserModel,
  'firstName' | 'lastName'
>;
