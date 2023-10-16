import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/repositories/repository.module';
import { PokemonUseCases } from 'src/useCases/pokemon/pokemon.useCases';
import { TypeUseCases } from 'src/useCases/types/type.useCases';

@Module({
  imports: [RepositoryModule],
  providers: [PokemonUseCases, TypeUseCases],
  exports: [PokemonUseCases, TypeUseCases],
})
export class UseCasesModule {}
