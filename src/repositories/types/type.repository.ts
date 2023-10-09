import { Injectable } from '@nestjs/common';
import { Type } from 'src/entities';
import { PlainTypeRepositoryOutput } from 'src/repositories/types/type.repository.type';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class TypeRepository extends Repository<Type> {
  constructor(readonly dataSource: DataSource) {
    super(Type, dataSource.createEntityManager());
  }

  /**
   * Get all the types stored in database
   * @returns An array with the list of all the types
   */
  public async getAll(): Promise<PlainTypeRepositoryOutput[]> {
    const result = await this.find({
      order: { name: 'ASC' },
    });

    return result;
  }
}
