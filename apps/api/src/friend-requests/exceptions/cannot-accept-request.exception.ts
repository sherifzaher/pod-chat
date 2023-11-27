import { HttpException, HttpStatus } from '@nestjs/common';

export class CannotAcceptRequestException extends HttpException {
  constructor() {
    super('Friend request cannot be accepted', HttpStatus.BAD_REQUEST);
  }
}
