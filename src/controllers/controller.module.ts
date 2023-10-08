import { Module } from '@nestjs/common';
import { PokemonController } from 'src/controllers/pokemon/pokemon.controller';
import { UseCasesModule } from 'src/useCases/useCase.module';

@Module({
  imports: [UseCasesModule],
  controllers: [PokemonController],
})
export class ControllerModule {}
