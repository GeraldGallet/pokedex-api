import { PokemonType } from 'src/entities/PokemonType';
import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

export type TypeId = string & { __brand: 'Type' };

@Entity('Types')
export class Type extends BaseEntity {
  @PrimaryColumn()
  id: TypeId;

  @Column()
  name: string;

  @OneToMany(() => PokemonType, (pokemonType) => pokemonType.type)
  pokemonTypes: PokemonType[];
}
