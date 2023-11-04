import { UserModel } from 'src/models/user.model';
import { CreateUserRepositoryInput } from 'src/repositories';

export type UserUseCasesOutput = UserModel;

export type CreateUserUseCasesInput = CreateUserRepositoryInput;
