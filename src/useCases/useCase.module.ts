import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/repositories/repository.module';
import { PokemonUseCases } from 'src/useCases/pokemon/pokemon.useCases';
import { TypeUseCases } from 'src/useCases/types/type.useCases';
import { UserUseCases } from 'src/useCases/user/user.useCases';

@Module({
  imports: [RepositoryModule],
  providers: [PokemonUseCases, TypeUseCases, UserUseCases],
  exports: [PokemonUseCases, TypeUseCases, UserUseCases],
})
export class UseCasesModule {}
