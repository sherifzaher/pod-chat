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

export const getConversationMessages = (conversationId: number, skip: number) =>
  axiosClient.get<FetchMessagePayload>(
    `/conversations/${conversationId}/messages?skip=${skip}`,
    config
  );

export const postNewMessage = (id: string, data: FormData) =>
  axiosClient.post(`/conversations/${id}/messages`, data, {
    ...config,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

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

export const postGroupMessage = (id: string, data: FormData) =>
  axiosClient.post(`/groups/${id}/messages`, data, {
    ...config,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

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

export const addGroupRecipient = ({ id, username }: AddGroupRecipientParams) =>
  axiosClient.post(`/groups/${id}/recipients`, { username }, config);

export const removeGroupRecipient = ({ id, userId }: RemoveGroupRecipientParams) =>
  axiosClient.delete<Group>(`/groups/${id}/recipients/${userId}`, config);

export const updateGroupOwner = ({ id, newOwnerId }: UpdateGroupOwnerParams) =>
  axiosClient.patch(`groups/${id}/owner`, { newOwnerId }, config);

export const leaveGroup = (id: number) =>
  axiosClient.delete(`/groups/${id}/recipients/leave`, config);

export const fetchFriends = () => axiosClient.get<Friend[]>('/friends', config);

export const fetchFriendRequests = () =>
  axiosClient.get<FriendRequest[]>('/friend-requests', config);

export const createFriendRequest = (username: string) =>
  axiosClient.post('/friend-requests', { username }, config);

export const cancelFriendRequest = (id: number) =>
  axiosClient.delete(`/friend-requests/${id}/cancel`, config);

export const rejectFriendRequest = (id: number) =>
  axiosClient.patch<FriendRequest>(`/friend-requests/${id}/reject`, null, config);

export const acceptFriendRequest = (id: number) =>
  axiosClient.patch<AcceptFriendRequestResponse>(`/friend-requests/${id}/accept`, null, config);

export const removeFriend = (id: number) =>
  axiosClient.delete<Friend>(`/friends/${id}/delete`, config);

export const checkConversationOrCreate = (recipientId: number) =>
  axiosClient.get(`/exists/conversations/${recipientId}`, config);

export const completeUserProfile = (data: any) =>
  axiosClient.post('/users/profile', data, {
    ...config,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

export const checkUsernameExists = (username: string) =>
  axiosClient.get(`/users/check?username=${username}`, config);

export const updateUserProfile = (data: FormData) =>
  axiosClient.patch<User>('/users/profiles', data, {
    ...config,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

export const updateStatusMessage = (data: UpdateStatusParams) =>
  axiosClient.patch('/users/presence/status', data, config);
