import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/controllers/user/user.dto';
import { UserPresenter } from 'src/controllers/user/user.presenter';
import { UserId } from 'src/entities';
import { UserUseCases } from 'src/useCases';

@Controller('/users')
export class UserController {
  constructor(private readonly userUseCases: UserUseCases) {}

  @Get()
  public async getAll(): Promise<UserPresenter[]> {
    const users = await this.userUseCases.getAll();

    return users.map(UserPresenter.from);
  }

  @Post()
  public async create(@Body() input: CreateUserDto): Promise<UserPresenter> {
    const user = await this.userUseCases.create(input);

    return UserPresenter.from(user);
  }

  @Delete('/:id')
  public async delete(@Param('id') id: UserId): Promise<void> {
    await this.userUseCases.delete(id);
  }
}
