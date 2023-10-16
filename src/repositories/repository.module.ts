import { Module } from '@nestjs/common';
import { PokemonRepository } from 'src/repositories/pokemon/pokemon.repository';
import { TypeRepository } from 'src/repositories/types/type.repository';

@Module({
  imports: [],
  providers: [PokemonRepository, TypeRepository],
  exports: [PokemonRepository, TypeRepository],
})
export class RepositoryModule {}
