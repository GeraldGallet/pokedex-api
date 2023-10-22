import { Module } from '@nestjs/common';
import { PokemonRepository } from 'src/repositories/pokemon/pokemon.repository';
import { TypeRepository } from 'src/repositories/types/type.repository';
import { UserRepository } from 'src/repositories/user/user.repository';

@Module({
  imports: [],
  providers: [PokemonRepository, TypeRepository, UserRepository],
  exports: [PokemonRepository, TypeRepository, UserRepository],
})
export class RepositoryModule {}
