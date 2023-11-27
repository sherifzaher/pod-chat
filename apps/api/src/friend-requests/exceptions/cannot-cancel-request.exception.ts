import { HttpException, HttpStatus } from '@nestjs/common';

export class CannotCancelRequestException extends HttpException {
  constructor() {
    super('Friend request cannot be canceled', HttpStatus.BAD_REQUEST);
  }
}
