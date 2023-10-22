import { Module } from '@nestjs/common';
import { PokemonController } from 'src/controllers/pokemon/pokemon.controller';
import { TypeController } from 'src/controllers/type/type.controller';
import { UserController } from 'src/controllers/user/user.controller';
import { UseCasesModule } from 'src/useCases/useCase.module';

@Module({
  imports: [UseCasesModule],
  controllers: [PokemonController, TypeController, UserController],
})
export class ControllerModule {}
