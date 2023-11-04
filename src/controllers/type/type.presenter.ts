import { ApiProperty } from '@nestjs/swagger';
import { PlainTypeModel } from 'src/models/type.model';

export class PlainTypePresenter {
  @ApiProperty()
  name: string;

  private constructor(data: PlainTypePresenter) {
    Object.assign(this, data);
  }

  public static from(data: PlainTypeModel) {
    return new PlainTypePresenter({
      name: data.name,
    });
  }
}
