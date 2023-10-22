import { Injectable } from '@nestjs/common';
import { InternalServerError, NotFoundException } from 'src/common';
import { User, UserId } from 'src/entities';
import {
  CreateUserRepositoryInput,
  UserRepositoryOutput,
} from 'src/repositories/user/user.repository.type';
import { adaptUserEntityToUserModel } from 'src/repositories/user/user.repository.utils';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  public async getAll(): Promise<UserRepositoryOutput[]> {
    const users = await this.find({
      relations: { pokemons: { pokemon: true } },
    });

    return users.map(adaptUserEntityToUserModel);
  }

  public async getById(id: UserId): Promise<UserRepositoryOutput> {
    const user = await this.findOne({
      where: { id },
      relations: { pokemons: { pokemon: true } },
    });

    if (!user) {
      throw new NotFoundException(`User: '${id}'`);
    }

    console.log('##### user');
    console.log(user);

    return adaptUserEntityToUserModel(user);
  }

  public async createUser(
    input: CreateUserRepositoryInput,
  ): Promise<UserRepositoryOutput> {
    const id = await this.dataSource.transaction(async (manager) => {
      const [newUser] = await manager.save<User>([
        manager.create<User>(User, { ...input, pokemons: [] }),
      ]);

      if (!newUser) {
        throw new InternalServerError('An error occured creating the new User');
      }

      return newUser.id;
    });

    return this.getById(id);
  }

  public async deleteUser(id: UserId): Promise<void> {
    await this.delete(id);
  }
}
