import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator';
import { PokemonId } from 'src/entities';

export class CreatePokemonDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ required: false, type: 'string', format: 'uuid' })
  @IsOptional()
  @IsUUID(4)
  evolvesTo?: PokemonId;

  @ApiProperty({ isArray: true, type: 'string' })
  @IsString({ each: true })
  types: string[];
}

export class UpdatePokemonDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false, type: 'string', format: 'uuid' })
  @IsOptional()
  @IsUUID(4)
  evolvesTo?: PokemonId;

  @ApiProperty({ required: false, type: 'integer' })
  @IsOptional()
  @IsInt()
  identifier?: number;

  @ApiProperty({ isArray: true, required: false, type: 'string' })
  @IsOptional()
  @IsString({ each: true })
  types?: string[];
}
