import { Controller, Get } from '@nestjs/common';
import { PokemonUseCases } from 'src/useCases/pokemon/pokemon.useCases';

@Controller('/pokemon')
export class PokemonController {
  constructor(private readonly pokemonUseCases: PokemonUseCases) {}

  @Get('/')
  public async getAll() {
    return this.pokemonUseCases.getAll();
  }
}
