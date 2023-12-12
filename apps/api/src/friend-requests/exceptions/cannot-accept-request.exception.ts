import { HttpException, HttpStatus } from '@nestjs/common';

export class CannotAcceptRequestException extends HttpException {
  constructor(msg?: string) {
    const defaultMsg = 'Friend request cannot be accepted';
    const error = msg
      ? defaultMsg.concat('Friend Request Exception: ', msg)
      : defaultMsg;
    super(error, HttpStatus.BAD_REQUEST);
  }
}
