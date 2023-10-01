import axios, { AxiosRequestConfig } from 'axios';

const { REACT_APP_API_URL } = process.env;

const config: AxiosRequestConfig = { withCredentials: true };

const axiosClient = axios.create({
  baseURL: REACT_APP_API_URL
});

export const postRegisterUser = async (data: CreateUserParams) =>
  axiosClient.post(`/auth/register`, data, config);

export const postLoginUser = async (data: UserCredentialsParams) =>
  axiosClient.post(`/auth/login`, data, config);

export const getAuthUser = async () => axiosClient.get(`/auth/status`, config);

export const getConversations = () => axiosClient.get<Conversation[]>(`/conversations`, config);

export const getConversationById = (id: number) =>
  axiosClient.get<Conversation>(`/conversations/${id}`, config);

export const getConversationMessages = (conversationId: number) =>
  axiosClient.get<FetchMessagePayload>(`/conversations/${conversationId}/messages`, config);

export const postNewMessage = ({ id, content }: CreateMessageParams) =>
  axiosClient.post(`/conversations/${id}/messages`, { content }, config);

export const postNewConversation = (data: CreateConversationParams) =>
  axiosClient.post<Conversation>(`/conversations`, data, config);

export const deleteMessage = ({ conversationId, messageId }: DeleteMessageParams) =>
  axiosClient.delete<DeleteMessageResponse>(
    `/conversations/${conversationId}/messages/${messageId}`,
    config
  );

export const editMessage = ({ conversationId, messageId, content }: EditMessagePayload) =>
  axiosClient.patch<Message>(
    `/conversations/${conversationId}/messages/${messageId}`,
    { content },
    config
  );

export const fetchGroups = () => axiosClient.get<Group[]>(`/groups`, config);

export const fetchGroupById = (id: number) => axiosClient.get<Group>(`/groups/${id}`, config);

export const fetchGroupMessages = (id: number) =>
  axiosClient.get<FetchGroupMessagePayload>(`/groups/${id}/messages`, config);

export const postGroupMessage = ({ id, content }: CreateMessageParams) =>
  axiosClient.post(`/groups/${id}/messages`, { content }, config);

export const searchUsers = (query: string) =>
  axiosClient.get<User[]>(`/users/search?query=${query}`, config);

export const createGroupAPI = (params: CreateGroupParams) =>
  axiosClient.post('/groups', params, config);

export const deleteGroupMessageAPI = ({ groupId, messageId }: DeleteGroupMessageParams) =>
  axiosClient.delete<DeleteGroupMessageParams>(
    `${REACT_APP_API_URL}/groups/${groupId}/messages/${messageId}`,
    config
  );

export const editGroupMessageAPI = ({ groupId, messageId, content }: EditGroupMessagePayload) =>
  axiosClient.patch<GroupMessageType>(
    `/groups/${groupId}/messages/${messageId}`,
    { content },
    config
  );

export const addGroupRecipient = ({ id, email }: AddGroupRecipientParams) =>
  axiosClient.post(`/groups/${id}/recipients`, { email }, config);

export const removeGroupRecipient = ({ id, userId }: RemoveGroupRecipientParams) =>
  axiosClient.delete<Group>(`/groups/${id}/recipients/${userId}`, config);

export const updateGroupOwner = ({ id, newOwnerId }: UpdateGroupOwnerParams) =>
  axiosClient.patch(`groups/${id}/owner`, { newOwnerId }, config);
