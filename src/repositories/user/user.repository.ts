import { Injectable } from '@nestjs/common';
import { InternalServerError, NotFoundException } from 'src/common';
import { Pokemon, User, UserId, UserPokemon } from 'src/entities';
import {
  CapturePokemonRepositoryInput,
  CreateUserRepositoryInput,
  UpdateUserRepositoryInput,
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
      relations: { pokemons: { pokemon: { types: { type: true } } } },
    });

    if (!user) {
      throw new NotFoundException(`User: '${id}'`);
    }

    console.log('##### user');
    console.log(JSON.stringify(user, null, 2));

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

  public async updateUser(
    id: UserId,
    input: UpdateUserRepositoryInput,
  ): Promise<UserRepositoryOutput> {
    await this.update(id, input);

    return this.getById(id);
  }

  public async capturePokemon(
    input: CapturePokemonRepositoryInput,
  ): Promise<UserRepositoryOutput> {
    const [user, pokemon] = await Promise.all([
      this.findOne({ where: { id: input.userId } }),
      this.dataSource
        .getRepository(Pokemon)
        .findOne({ where: { id: input.pokemonId } }),
    ]);

    console.log('##### input');
    console.log(input);

    console.log('##### pokemon');
    console.log(pokemon);
    if (!user) {
      throw new NotFoundException(`User: '${input.userId}'`);
    }

    if (!pokemon) {
      throw new NotFoundException(`Pokemon: '${input.pokemonId}'`);
    }

    await this.dataSource
      .getRepository(UserPokemon)
      .save([{ user, pokemon, surname: input.surname }]);

    return this.getById(input.userId);
  }

  public async deleteUser(id: UserId): Promise<void> {
    await this.delete(id);
  }
}
