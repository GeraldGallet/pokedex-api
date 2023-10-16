import { Injectable } from '@nestjs/common';
import { NotFoundException } from 'src/common';
import { PlainPokemonPresenter } from 'src/controllers/pokemon/pokemon.presenter';
import { Pokemon, PokemonId, PokemonType, Type } from 'src/entities';
import {
  CreatePokemonRepositoryInput,
  PlainPokemonRepositoryOutput,
  UpdatePokemonRepositoryInput,
} from 'src/repositories/pokemon/pokemon.repository.type';
import { adaptPokemonToPlainPokemonRepositoryOutput } from 'src/repositories/pokemon/pokemon.repository.utils';
import { DataSource, In, Repository } from 'typeorm';
import { v4 } from 'uuid';

@Injectable()
export class PokemonRepository extends Repository<Pokemon> {
  constructor(readonly dataSource: DataSource) {
    super(Pokemon, dataSource.createEntityManager());
  }

  /**
   * Get all the pokemons stored in database
   * @returns An array with the list of all the pokemons
   */
  public async getAll(): Promise<PlainPokemonRepositoryOutput[]> {
    const result = await this.find({
      order: { identifier: 'ASC' },
      relations: { types: { type: true } },
    });

    return result.map(adaptPokemonToPlainPokemonRepositoryOutput);
  }

  /**
   * Get the last pokemon by identifier
   * @returns Last pokemon if found, null otherwise
   */
  public async findLastPokemon(): Promise<PlainPokemonPresenter | null> {
    const pokemons = await this.find({
      order: { identifier: 'DESC' },
      take: 1,
      relations: { types: { type: true } },
    });

    return pokemons.length
      ? adaptPokemonToPlainPokemonRepositoryOutput(pokemons[0])
      : null;
  }

  /**
   * Get a pokemon's data by its ID
   * @param id Pokemon's ID
   * @returns Plain pokemon data
   * @throws NotFoundException: no pokemon with this ID was found
   */
  public async getPlainById(
    id: PokemonId,
  ): Promise<PlainPokemonRepositoryOutput> {
    const result = await this.findOne({
      where: { id },
      relations: { types: { type: true } },
    });

    if (result) {
      return adaptPokemonToPlainPokemonRepositoryOutput(result);
    }

    throw new NotFoundException(`Pokemon: '${id}'`);
  }

  /**
   * Create a new Pokemon
   * @param input Data for the Pokemon to be created
   * @returns Created pokemon
   */
  public async createPokemon(
    input: CreatePokemonRepositoryInput,
  ): Promise<PlainPokemonRepositoryOutput> {
    const id = await this.dataSource.transaction(async (manager) => {
      const [pokemon] = await manager.save<Pokemon>(
        manager.create<Pokemon>(Pokemon, [
          {
            ...input,
            id: v4(),
            types: undefined,
          },
        ]),
      );

      if (input.types) {
        await manager.delete<PokemonType>(PokemonType, {
          pokemon: { id: pokemon.id },
        });

        const newTypes = await manager.find<Type>(Type, {
          where: {
            name: In(input.types),
          },
        });

        await manager.save<PokemonType>(
          newTypes.map((type) =>
            manager.create<PokemonType>(PokemonType, {
              id: v4(),
              pokemon: { id: pokemon.id },
              type,
            }),
          ),
        );
      }

      return pokemon.id;
    });

    return this.getPlainById(id);
  }

  /**
   * Update a Pokemon's data by its ID
   * @param id Pokemon's ID
   * @param input Data for the update
   * @returns The updated Pokemon
   */
  public async updateById(
    id: PokemonId,
    input: UpdatePokemonRepositoryInput,
  ): Promise<PlainPokemonRepositoryOutput> {
    await this.dataSource.transaction(async (manager) => {
      if (input.types) {
        await manager.delete<PokemonType>(PokemonType, { pokemon: { id } });

        const newTypes = await manager.find<Type>(Type, {
          where: {
            name: In(input.types),
          },
        });

        await manager.save<PokemonType>(
          newTypes.map((type) =>
            manager.create<PokemonType>(PokemonType, {
              id: v4(),
              pokemon: { id },
              type,
            }),
          ),
        );
      }

      await manager.update<Pokemon>(Pokemon, id, {
        ...input,
        types: undefined,
      });
    });

    return this.getPlainById(id);
  }

  /**
   * Delete a Pokemon from database
   * @param id Pokemon's ID
   */
  public async deleteById(id: PokemonId): Promise<void> {
    await this.delete({ id });
  }
}
