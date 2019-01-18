import { HttpException, HttpStatus } from '@nestjs/common';

export class BadRequestException extends HttpException {
  constructor(reason: string) {
    super({
      status: HttpStatus.BAD_REQUEST,
      error: reason,
    }, HttpStatus.BAD_REQUEST);
  }
}