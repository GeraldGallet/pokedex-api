import { Injectable } from '@nestjs/common';
import { NotFoundException } from 'src/common';
import { Pokemon, PokemonId, PokemonType, Type } from 'src/entities';
import {
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
