import { HttpException, HttpStatus } from '@nestjs/common';

export class GroupOwnerTransferException extends HttpException {
  constructor(msg = 'Group Owner Transfer Exception') {
    super(msg, HttpStatus.BAD_REQUEST);
  }
}
