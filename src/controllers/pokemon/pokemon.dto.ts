import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator';
import { PokemonId } from 'src/entities';

export class CreatePokemonDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsUUID(4)
  evolvesTo?: PokemonId;

  @IsString({ each: true })
  types: string[];
}

export class UpdatePokemonDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsUUID(4)
  evolvesTo?: PokemonId;

  @IsOptional()
  @IsInt()
  identifier?: number;

  @IsOptional()
  @IsString({ each: true })
  types?: string[];
}
