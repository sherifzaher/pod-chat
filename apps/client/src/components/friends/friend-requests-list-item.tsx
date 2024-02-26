import { MdCheck, MdClose } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';

import { FriendRequestActionIcon, FriendRequestItemContainer } from '../../utils/styles/friends';
import { AppDispatch, RootState } from '../../store';
import {
  acceptFriendRequestThunk,
  cancelFriendRequestThunk,
  rejectFriendRequestThunk
} from '../../store/slices/friends-slice';
import { UserAvatar } from '../messages/message-item-avatar';
import { FriendRequestIcons } from './friend-request/friend-request-icons';
import { getFriendRequestDetails } from '../../utils/helpers';
import { FriendRequestDetails } from './friend-request/friend-request-details';

type Props = {
  friendRequest: FriendRequest;
};

function FriendRequestListItem({ friendRequest }: Props) {
  const { user } = useSelector((state: RootState) => state.user);
  const isIncomingRequest = user?.id !== friendRequest.sender.id;
  const dispatch = useDispatch<AppDispatch>();

  const friendRequestDetails = getFriendRequestDetails(friendRequest, user);

  const handleFriendRequest = (type?: HandleFriendRequestAction) => {
    if (!isIncomingRequest) {
      dispatch(cancelFriendRequestThunk(friendRequest.id));
      return;
    }
    if (type === 'accept') {
      dispatch(acceptFriendRequestThunk(friendRequest.id));
      return;
    } else {
      dispatch(rejectFriendRequestThunk(friendRequest.id));
      return;
    }
  };

  return (
    <FriendRequestItemContainer>
      <FriendRequestDetails details={friendRequestDetails} />
      <FriendRequestIcons
        details={friendRequestDetails}
        handleFriendRequest={handleFriendRequest}
      />
    </FriendRequestItemContainer>
  );
}

export default FriendRequestListItem;
