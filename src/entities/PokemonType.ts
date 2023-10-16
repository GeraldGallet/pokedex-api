import { Pokemon } from 'src/entities/Pokemon';
import { Type } from 'src/entities/Type';
import { BaseEntity, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

export type PokemonTypeId = string & { __brand: 'PokemonType' };

@Entity('PokemonTypes')
export class PokemonType extends BaseEntity {
  @PrimaryColumn()
  id: PokemonTypeId;

  @ManyToOne(() => Pokemon, (pokemon) => pokemon.types, {
    onDelete: 'CASCADE',
  })
  pokemon: Pokemon;

  @ManyToOne(() => Type, (type) => type.pokemonTypes, {
    onDelete: 'CASCADE',
  })
  type: Type;
}
