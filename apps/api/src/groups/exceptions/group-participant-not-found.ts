import { HttpException, HttpStatus } from '@nestjs/common';

export class GroupParticipantNotFound extends HttpException {
  constructor() {
    super('Group Participant Not found!', HttpStatus.NOT_FOUND);
  }
}
