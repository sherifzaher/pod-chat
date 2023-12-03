import { MdCheck, MdClose } from 'react-icons/md';

import { useDispatch } from 'react-redux';
import { useAuthContext } from '../../context/auth-context';
import { FriendRequestActionIcon, FriendRequestItemContainer } from '../../utils/styles/friends';
import { AppDispatch } from '../../store';
import { cancelFriendRequestThunk } from '../../store/slices/friends-slice';

type Props = {
  friendRequest: FriendRequest;
};

function FriendRequestListItem({ friendRequest }: Props) {
  const { user } = useAuthContext();
  const isIncomingRequest = user?.id !== friendRequest.sender.id;
  const dispatch = useDispatch<AppDispatch>();

  const handleFriendRequest = (type: HandleFriendRequestAction) => {
    if (!isIncomingRequest) {
      // console.log('cancel friend request');
      return dispatch(cancelFriendRequestThunk(friendRequest.id));
      // return null;
    }

    if (type === 'accept') {
      console.log('accept friend request');
    } else {
      console.log('reject friend request');
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
