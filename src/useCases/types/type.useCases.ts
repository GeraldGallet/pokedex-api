import { Injectable } from '@nestjs/common';
import { TypeRepository } from 'src/repositories/types/type.repository';

@Injectable()
export class TypeUseCases {
  constructor(private readonly typeRepository: TypeRepository) {}

  /**
   * Get all the types stored in database
   * @returns List of all the types
   */
  public async getAll() {
    return this.typeRepository.getAll();
  }
}
