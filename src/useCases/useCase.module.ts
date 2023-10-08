import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/repositories/repository.module';
import { PokemonUseCases } from 'src/useCases/pokemon/pokemon.useCases';

@Module({
  imports: [RepositoryModule],
  providers: [PokemonUseCases],
  exports: [PokemonUseCases],
})
export class UseCasesModule {}
