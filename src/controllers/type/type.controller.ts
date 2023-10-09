import { Controller, Get } from '@nestjs/common';
import { PlainTypePresenter } from 'src/controllers/type/type.presenter';
import { TypeUseCases } from 'src/useCases/types/type.useCases';

@Controller('/type')
export class TypeController {
  constructor(private readonly typeUseCases: TypeUseCases) {}

  @Get('/')
  public async getAll() {
    const result = await this.typeUseCases.getAll();

    return result.map(PlainTypePresenter.from);
  }
}
