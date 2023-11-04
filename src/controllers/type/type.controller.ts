import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PlainTypePresenter } from 'src/controllers/type/type.presenter';
import { TypeUseCases } from 'src/useCases/types/type.useCases';

@ApiTags('types')
@Controller('/type')
export class TypeController {
  constructor(private readonly typeUseCases: TypeUseCases) {}

  @Get('/')
  @ApiOperation({
    description: 'Get all tags',
    operationId: 'getAllTags',
  })
  @ApiOkResponse({
    isArray: true,
    type: PlainTypePresenter,
  })
  public async getAll(): Promise<PlainTypePresenter[]> {
    const result = await this.typeUseCases.getAll();

    return result.map(PlainTypePresenter.from);
  }
}
