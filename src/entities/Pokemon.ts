import { PokemonType } from 'src/entities/PokemonType';
import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

export type PokemonId = string & { __brand: 'Pokemon' };

@Entity('Pokemons')
export class Pokemon extends BaseEntity {
  @PrimaryColumn()
  id: PokemonId;

  @Column()
  name: string;

  @Column({ nullable: true })
  evolvesTo?: PokemonId;

  @Column()
  identifier: number;

  @OneToMany(() => PokemonType, (pokemonType) => pokemonType.pokemon)
  types: PokemonType[];
}
