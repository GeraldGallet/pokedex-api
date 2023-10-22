import { Injectable } from '@nestjs/common';
import { UserId } from 'src/entities';
import { UserRepository } from 'src/repositories';
import {
  CreateUserUseCasesInput,
  UserUseCasesOutput,
} from 'src/useCases/user/user.useCases.type';

@Injectable()
export class UserUseCases {
  constructor(private readonly userRepository: UserRepository) {}

  public async getAll(): Promise<UserUseCasesOutput[]> {
    return this.userRepository.getAll();
  }

  public async create(
    input: CreateUserUseCasesInput,
  ): Promise<UserUseCasesOutput> {
    return this.userRepository.createUser(input);
  }

  public async delete(id: UserId): Promise<void> {
    await this.userRepository.delete(id);
  }
}
