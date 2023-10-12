import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator';
import { PokemonId } from 'src/entities';

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
