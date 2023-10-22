import { Pokemon } from 'src/entities/Pokemon';
import { User } from 'src/entities/User';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export type UserPokemonId = string & { __brand: 'UserPokemon' };

@Entity('UserPokemon')
export class UserPokemon {
  @PrimaryGeneratedColumn('uuid')
  id: UserPokemonId;

  @Column()
  surname: string;

  @ManyToOne(() => Pokemon, (pokemon) => pokemon.userPokemons, {
    onDelete: 'CASCADE',
  })
  pokemon: Pokemon;

  @ManyToOne(() => User, (user) => user.pokemons, { onDelete: 'CASCADE' })
  user: User;
}
