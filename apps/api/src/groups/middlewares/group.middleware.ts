import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';

import { AuthenticatedRequest } from '../../utils/types';
import { Services } from '../../utils/constants';
import { IGroupService } from '../interfaces/group';
import { InvalidGroupException } from '../exceptions/invalid-group-exception';
import { GroupNotFoundException } from '../exceptions/group-not-found-exception';

@Injectable()
export class GroupMiddleware implements NestMiddleware {
  constructor(
    @Inject(Services.GROUPS_SERVICE)
    private readonly groupService: IGroupService,
  ) {}
  async use(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { id: userId } = req.user;
    const groupId = parseInt(req.params.id, 10);
    if (isNaN(groupId)) throw new InvalidGroupException();

    const params = { groupId, userId };
    const user = await this.groupService.hasAccess(groupId, userId);
    if (user) return next();
    throw new GroupNotFoundException();
  }
}
