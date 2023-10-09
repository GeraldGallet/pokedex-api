import { Controller, Get, Param } from '@nestjs/common';
import { PlainPokemonPresenter } from 'src/controllers/pokemon/pokemon.presenter';
import { PokemonId } from 'src/entities';
import { PokemonUseCases } from 'src/useCases/pokemon/pokemon.useCases';

@Controller('/pokemon')
export class PokemonController {
  constructor(private readonly pokemonUseCases: PokemonUseCases) {}

  @Get('/')
  public async getAll(): Promise<PlainPokemonPresenter[]> {
    return this.pokemonUseCases.getAll();
  }

  @Get('/:id')
  public async getById(
    @Param('id') id: PokemonId,
  ): Promise<PlainPokemonPresenter> {
    return this.pokemonUseCases.getPlainById(id);
  }
}
