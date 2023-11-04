import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import { PokemonId } from 'src/entities';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;
}

export class UpdateUserDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  lastName?: string;
}

export class CapturePokemonDto {
  @ApiProperty({ format: 'uuid', type: 'string' })
  @IsUUID(4)
  pokemonId: PokemonId;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  surname?: string;
}
