import { HttpException, HttpStatus } from '@nestjs/common';

export class FriendsAlreadyExists extends HttpException {
  constructor() {
    super('Friends already exists', HttpStatus.BAD_REQUEST);
  }
}
