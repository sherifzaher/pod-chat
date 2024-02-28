import { Group, User } from '../../utils/typeorm';
import {
  CreateGroupParams,
  FetchGroupParams,
  TransferOwnerParams,
} from '../../utils/types';

export interface IGroupService {
  createGroup(params: CreateGroupParams): Promise<Group>;
  getGroups(params: FetchGroupParams): Promise<Group[]>;
  findGroupById(id: number): Promise<Group | undefined>;
  saveGroup(params: Group): Promise<Group>;
  hasAccess(groupId: number, userId: number): Promise<User | undefined>;
  transferGroupOwner(params: TransferOwnerParams): Promise<Group>;
}
