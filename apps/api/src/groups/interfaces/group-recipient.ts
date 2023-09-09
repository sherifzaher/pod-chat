import {
  AddGroupRecipientParams,
  AddGroupUserResponse,
  RemoveGroupRecipientParams,
  RemoveGroupUserResponse,
} from '../../utils/types';
import { Group } from '../../utils/typeorm';

export interface IGroupRecipientService {
  addGroupRecipient(
    payload: AddGroupRecipientParams,
  ): Promise<AddGroupUserResponse>;
  removeGroupRecipient(
    params: RemoveGroupRecipientParams,
  ): Promise<RemoveGroupUserResponse>;
}
