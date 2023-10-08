import { Injectable } from '@nestjs/common';
import { PokemonRepository } from 'src/repositories/pokemon/pokemon.repository';

@Injectable()
export class PokemonUseCases {
  constructor(private readonly pokemonRepository: PokemonRepository) {}

  /**
   * Get all the pokemons stored in database
   * @returns List of all the pokemons
   */
  public async getAll() {
    return this.pokemonRepository.getAll();
  }
}
