import { Injectable } from '@nestjs/common';
import { PokemonId } from 'src/entities';
import { PokemonRepository } from 'src/repositories/pokemon/pokemon.repository';
import { PlainPokemonUseCasesOutput } from 'src/useCases/pokemon/pokemon.useCases.type';

@Injectable()
export class PokemonUseCases {
  constructor(private readonly pokemonRepository: PokemonRepository) {}

  /**
   * Get all the pokemons stored in database
   * @returns List of all the pokemons
   */
  public async getAll(): Promise<PlainPokemonUseCasesOutput[]> {
    return this.pokemonRepository.getAll();
  }

  /**
   * Get a pokemon's data by its ID
   * @param id Pokemon's ID
   * @returns Plain pokemon data
   * @throws NotFoundException: no pokemon with this ID was found
   */
  public async getPlainById(
    id: PokemonId,
  ): Promise<PlainPokemonUseCasesOutput> {
    return this.pokemonRepository.getPlainById(id);
  }
}
