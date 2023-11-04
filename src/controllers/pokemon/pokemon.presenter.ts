import { ApiProperty } from '@nestjs/swagger';
import { PokemonId } from 'src/entities';
import { PlainPokemonUseCasesOutput } from 'src/useCases';

export class PlainPokemonPresenter {
  @ApiProperty({ type: 'string', format: 'uuid' })
  id: PokemonId;

  @ApiProperty({ type: 'string', format: 'uuid', required: false })
  evolvesTo?: PokemonId;

  @ApiProperty({ type: 'integer' })
  identifier: number;

  @ApiProperty()
  name: string;

  @ApiProperty({ isArray: true, type: 'string' })
  types: string[];

  private constructor(data: PlainPokemonPresenter) {
    Object.assign(this, data);
  }

  public static from(data: PlainPokemonUseCasesOutput) {
    return new PlainPokemonPresenter(data);
  }
}
