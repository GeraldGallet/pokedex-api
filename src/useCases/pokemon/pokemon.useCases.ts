import { Injectable } from '@nestjs/common';
import { PokemonId } from 'src/entities';
import { PokemonRepository } from 'src/repositories/pokemon/pokemon.repository';
import {
  PlainPokemonUseCasesOutput,
  UpdatePokemonUseCasesInput,
} from 'src/useCases/pokemon/pokemon.useCases.type';

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

  /**
   * Update a Pokemon's data by its ID
   * @param id Pokemon's ID
   * @param input Data for the update
   * @returns The updated Pokemon
   */
  public async updateById(
    id: PokemonId,
    input: UpdatePokemonUseCasesInput,
  ): Promise<PlainPokemonUseCasesOutput> {
    return this.pokemonRepository.updateById(id, input);
  }

  /**
   * Delete a Pokemon from database
   * @param id Pokemon's ID
   * @throws NotFoundException: no pokemon with this ID was found
   */
  public async deleteById(id: PokemonId): Promise<void> {
    // 2 options possibles ici :
    // 1ère option: je vérifie l'existence de mon Pokémon avant de le supprimer
    const pokemon = await this.getPlainById(id);
    await this.pokemonRepository.deleteById(pokemon.id);

    // 2ème option: je ne vérifie pas: de toute façon j'allais le supprimer
    // await this.pokemonRepository.deleteById(pokemon.id)

    // Les 2 sont toutes aussi valables l'une que l'autre quand on supprime une donnée de manière aussi simple
    // Si je dois faire du traitement sur la donnée avant de la supprimer, je dois peut-être vérifier qu'elle existe
  }
}
