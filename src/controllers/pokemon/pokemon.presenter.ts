import { PokemonId } from 'src/entities';
import { PlainPokemonUseCasesOutput } from 'src/useCases';

export class PlainPokemonPresenter {
  id: PokemonId;

  evolvesTo?: PokemonId;
  identifier: number;
  name: string;
  types: string[];

  private constructor(data: PlainPokemonPresenter) {
    Object.assign(this, data);
  }

  public static from(data: PlainPokemonUseCasesOutput) {
    return new PlainPokemonPresenter(data);
  }
}
