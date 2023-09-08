import {
  AddGroupRecipientParams,
  RemoveGroupRecipientParams,
} from '../../utils/types';

export interface IGroupRecipientService {
  addGroupRecipient(payload: AddGroupRecipientParams);
  removeGroupRecipient(params: RemoveGroupRecipientParams);
}
