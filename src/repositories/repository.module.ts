import { Module } from '@nestjs/common';
import { PokemonRepository } from 'src/repositories/pokemon/pokemon.repository';

@Module({
  imports: [],
  providers: [PokemonRepository],
  exports: [PokemonRepository],
})
export class RepositoryModule {}
