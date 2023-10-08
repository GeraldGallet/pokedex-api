import { Injectable } from '@nestjs/common';
import { Pokemon } from 'src/entities';
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
}
