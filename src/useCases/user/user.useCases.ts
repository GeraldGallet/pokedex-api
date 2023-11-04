import { Injectable } from '@nestjs/common';
import { UserId } from 'src/entities';
import { UserRepository } from 'src/repositories';
import {
  CapturePokemonUseCasesInput,
  CreateUserUseCasesInput,
  UpdateUserUseCasesInput,
  UserUseCasesOutput,
} from 'src/useCases/user/user.useCases.type';

@Injectable()
export class UserUseCases {
  constructor(private readonly userRepository: UserRepository) {}

  public async getAll(): Promise<UserUseCasesOutput[]> {
    return this.userRepository.getAll();
  }

  public async getById(id: UserId): Promise<UserUseCasesOutput> {
    return this.userRepository.getById(id);
  }

  public async create(
    input: CreateUserUseCasesInput,
  ): Promise<UserUseCasesOutput> {
    return this.userRepository.createUser(input);
  }

  public async update(
    id: UserId,
    input: UpdateUserUseCasesInput,
  ): Promise<UserUseCasesOutput> {
    return this.userRepository.updateUser(id, input);
  }

  public async capturePokemon(
    input: CapturePokemonUseCasesInput,
  ): Promise<UserUseCasesOutput> {
    return this.userRepository.capturePokemon(input);
  }

  public async delete(id: UserId): Promise<void> {
    await this.userRepository.delete(id);
  }
}
