import { MdCheck, MdClose } from 'react-icons/md';

import { useDispatch } from 'react-redux';
import { useAuthContext } from '../../context/auth-context';
import { FriendRequestActionIcon, FriendRequestItemContainer } from '../../utils/styles/friends';
import { AppDispatch } from '../../store';
import {
  acceptFriendRequestThunk,
  cancelFriendRequestThunk,
  rejectFriendRequestThunk
} from '../../store/slices/friends-slice';

type Props = {
  friendRequest: FriendRequest;
};

function FriendRequestListItem({ friendRequest }: Props) {
  const { user } = useAuthContext();
  const isIncomingRequest = user?.id !== friendRequest.sender.id;
  const dispatch = useDispatch<AppDispatch>();

  const handleFriendRequest = (type: HandleFriendRequestAction) => {
    if (!isIncomingRequest) {
      return dispatch(cancelFriendRequestThunk(friendRequest.id));
    }

    if (type === 'accept') {
      return dispatch(acceptFriendRequestThunk(friendRequest.id));
    } else {
      return dispatch(rejectFriendRequestThunk(friendRequest.id));
    }
  };

  return (
    <FriendRequestItemContainer>
      <div className="avatar" />
      <div className="requestInfo">
        {isIncomingRequest ? (
          <>
            <span>{`${friendRequest.sender.firstName} ${friendRequest.sender.lastName}`}</span>
            <span className="requestStatus">Incoming request</span>
          </>
        ) : (
          <>
            <span>{`${friendRequest.receiver.firstName} ${friendRequest.receiver.lastName}`}</span>
            <span className="requestStatus">Outgoing Friend Request</span>
          </>
        )}
      </div>
      <div className="requestActions">
        {isIncomingRequest && (
          <FriendRequestActionIcon isAccept onClick={() => handleFriendRequest('accept')}>
            <MdCheck />
          </FriendRequestActionIcon>
        )}
        <FriendRequestActionIcon onClick={() => handleFriendRequest('reject')}>
          <MdClose />
        </FriendRequestActionIcon>
      </div>
    </FriendRequestItemContainer>
  );
}

export default FriendRequestListItem;
