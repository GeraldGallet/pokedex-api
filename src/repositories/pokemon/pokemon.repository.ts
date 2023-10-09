import { Injectable } from '@nestjs/common';
import { NotFoundException } from 'src/common';
import { Pokemon, PokemonId } from 'src/entities';
import { PlainPokemonRepositoryOutput } from 'src/repositories/pokemon/pokemon.repository.type';
import { adaptPokemonToPlainPokemonRepositoryOutput } from 'src/repositories/pokemon/pokemon.repository.utils';
import { DataSource, Repository } from 'typeorm';

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
   * Delete a Pokemon from database
   * @param id Pokemon's ID
   */
  public async deleteById(id: PokemonId): Promise<void> {
    await this.delete({ id });
  }
}
