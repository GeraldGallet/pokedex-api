import { PokemonId, UserId } from 'src/entities';
import { UserModel, UserPokemonModel } from 'src/models/user.model';

export class UserPokemonPresenter {
  surname: string;

  evolvesTo?: PokemonId;
  identifier: number;
  name: string;
  types: string[];

  private constructor(data: UserPokemonPresenter) {
    Object.assign(this, data);
  }

  public static from(data: UserPokemonModel) {
    return new UserPokemonPresenter(data);
  }
}

export class UserPresenter {
  id: UserId;

  firstName: string;
  lastName: string;

  pokemons: UserPokemonPresenter[];

  private constructor(data: UserPresenter) {
    Object.assign(this, data);
  }

  public static from(data: UserModel) {
    return new UserPresenter({
      ...data,
      pokemons: data.pokemons.map(UserPokemonPresenter.from),
    });
  }
}
