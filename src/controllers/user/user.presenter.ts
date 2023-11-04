import { ApiProperty } from '@nestjs/swagger';
import { PokemonId, UserId } from 'src/entities';
import { UserModel, UserPokemonModel } from 'src/models/user.model';

export class UserPokemonPresenter {
  @ApiProperty({ required: false })
  surname?: string;

  @ApiProperty({ type: 'string', format: 'uuid', required: false })
  evolvesTo?: PokemonId;

  @ApiProperty({ type: 'integer' })
  identifier: number;

  @ApiProperty()
  name: string;

  @ApiProperty({ isArray: true })
  types: string[];

  private constructor(data: UserPokemonPresenter) {
    Object.assign(this, data);
  }

  public static from(data: UserPokemonModel) {
    return new UserPokemonPresenter(data);
  }
}

export class UserPresenter {
  @ApiProperty({ type: 'string', format: 'uuid' })
  id: UserId;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty({ isArray: true, type: UserPokemonPresenter })
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
