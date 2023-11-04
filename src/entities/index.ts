import { PokemonType } from './PokemonType';
import { Pokemon } from './Pokemon';
import { Type } from './Type';
import { User } from 'src/entities/User';
import { UserPokemon } from 'src/entities/UserPokemon';

export * from './Pokemon';
export * from './PokemonType';
export * from './Type';
export * from './User';
export * from './UserPokemon';

export const entities = [Pokemon, PokemonType, Type, User, UserPokemon];
