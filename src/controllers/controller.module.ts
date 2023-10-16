import { Module } from '@nestjs/common';
import { PokemonController } from 'src/controllers/pokemon/pokemon.controller';
import { TypeController } from 'src/controllers/type/type.controller';
import { UseCasesModule } from 'src/useCases/useCase.module';

@Module({
  imports: [UseCasesModule],
  controllers: [PokemonController, TypeController],
})
export class ControllerModule {}
