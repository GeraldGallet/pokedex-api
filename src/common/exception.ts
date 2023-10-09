import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundException extends HttpException {
  constructor(resource: string) {
    super(
      {
        status: HttpStatus.NOT_FOUND,
        error: `${resource} was not found.`,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
