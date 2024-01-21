import { HttpException, HttpStatus } from '@nestjs/common';

export class UserAlreadyExistException extends HttpException {
  constructor() {
    super('User already found', HttpStatus.CONFLICT);
  }
}
