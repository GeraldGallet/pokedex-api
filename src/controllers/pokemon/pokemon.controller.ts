import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  CreatePokemonDto,
  UpdatePokemonDto,
} from 'src/controllers/pokemon/pokemon.dto';
import { PlainPokemonPresenter } from 'src/controllers/pokemon/pokemon.presenter';
import { PokemonId } from 'src/entities';
import { PokemonUseCases } from 'src/useCases/pokemon/pokemon.useCases';

@ApiTags('pokemons')
@Controller('/pokemon')
export class PokemonController {
  constructor(private readonly pokemonUseCases: PokemonUseCases) {}

  @Get('/')
  @ApiOperation({
    description: 'Get a list of all pokemons',
    operationId: 'getAllPokemons',
  })
  @ApiOkResponse({
    isArray: true,
    type: PlainPokemonPresenter,
  })
  public async getAll(): Promise<PlainPokemonPresenter[]> {
    return this.pokemonUseCases.getAll();
  }

  @Get('/:id')
  @ApiOperation({
    description: 'Retrieve a Pokemon by its ID',
    operationId: 'getPokemon',
  })
  @ApiOkResponse({
    type: PlainPokemonPresenter,
  })
  public async getById(
    @Param('id') id: PokemonId,
  ): Promise<PlainPokemonPresenter> {
    return this.pokemonUseCases.getPlainById(id);
  }

  @Post()
  public async createPokemon(
    @Body() input: CreatePokemonDto,
  ): Promise<PlainPokemonPresenter> {
    return this.pokemonUseCases.createPokemon(input);
  }

  @Patch('/:id')
  public async updateById(
    @Param('id') id: PokemonId,
    @Body() input: UpdatePokemonDto,
  ): Promise<PlainPokemonPresenter> {
    return this.pokemonUseCases.updateById(id, input);
  }

  @Delete('/:id')
  public async deleteById(@Param('id') id: PokemonId): Promise<void> {
    await this.pokemonUseCases.deleteById(id);
  }
}
