import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  CapturePokemonDto,
  CreateUserDto,
  UpdateUserDto,
} from 'src/controllers/user/user.dto';
import { UserPresenter } from 'src/controllers/user/user.presenter';
import { UserId } from 'src/entities';
import { UserUseCases } from 'src/useCases';

@ApiTags('users')
@Controller('/users')
export class UserController {
  constructor(private readonly userUseCases: UserUseCases) {}

  @Get()
  @ApiOperation({
    description: 'Get all users',
    operationId: 'getAllUsers',
  })
  @ApiOkResponse({
    isArray: true,
    type: UserPresenter,
  })
  public async getAll(): Promise<UserPresenter[]> {
    const users = await this.userUseCases.getAll();

    return users.map(UserPresenter.from);
  }

  @Get('/:id')
  @ApiOperation({
    description: 'Retrieve a user by its ID',
    operationId: 'getUser',
  })
  @ApiOkResponse({
    type: UserPresenter,
  })
  @ApiResponse({
    status: 404,
    description: 'User with this ID was not found',
  })
  public async getById(@Param('id') id: UserId): Promise<UserPresenter> {
    const user = await this.userUseCases.getById(id);

    return UserPresenter.from(user);
  }

  @Post()
  @ApiOperation({
    description: 'Create a new User',
    operationId: 'createUser',
  })
  @ApiOkResponse({
    type: UserPresenter,
  })
  public async create(@Body() input: CreateUserDto): Promise<UserPresenter> {
    const user = await this.userUseCases.create(input);

    return UserPresenter.from(user);
  }

  @Patch('/:id')
  @ApiOperation({
    description: 'Update a User',
    operationId: 'updateUser',
  })
  @ApiOkResponse({
    type: UserPresenter,
  })
  public async updateUser(
    @Param('id') id: UserId,
    @Body() input: UpdateUserDto,
  ): Promise<UserPresenter> {
    const user = await this.userUseCases.update(id, input);

    return UserPresenter.from(user);
  }

  @Post('/:id/pokemons')
  @ApiOperation({
    description: 'Capture a Pokemon for a user',
    operationId: 'capturePokemon',
  })
  @ApiOkResponse({
    type: UserPresenter,
  })
  public async capturePokemon(
    @Param('id') id: UserId,
    @Body() input: CapturePokemonDto,
  ): Promise<UserPresenter> {
    const user = await this.userUseCases.capturePokemon({
      ...input,
      userId: id,
    });

    return UserPresenter.from(user);
  }

  @Delete('/:id')
  @ApiOperation({
    description: 'Delete a user',
    operationId: 'deleteUser',
  })
  public async delete(@Param('id') id: UserId): Promise<void> {
    await this.userUseCases.delete(id);
  }
}
