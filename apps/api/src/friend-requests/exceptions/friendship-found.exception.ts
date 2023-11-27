import { HttpException, HttpStatus } from '@nestjs/common';

export class FriendShipFoundException extends HttpException {
  constructor() {
    super('Friendship exists', HttpStatus.BAD_REQUEST);
  }
}
