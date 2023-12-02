import { MdCancel, MdCheck, MdCheckCircle, MdClose } from 'react-icons/md';
import { useAuthContext } from '../../context/auth-context';
import { FlexBox } from '../../utils/styles/common';
import { FriendRequestActionIcon, FriendRequestItemContainer } from '../../utils/styles/friends';

type Props = {
  friendRequest: FriendRequest;
};

const ICON_COLOR = '#2e2e2e';
const ICON_SIZE = 20;

function FriendRequestListItem({ friendRequest }: Props) {
  const { user } = useAuthContext();
  const isIncomingRequest = user?.id !== friendRequest.sender.id;

  return (
    <FriendRequestItemContainer>
      <div className="avatar" />
      <div className="requestInfo">
        <span>{`${friendRequest.receiver.firstName} ${friendRequest.receiver.lastName}`}</span>
        {isIncomingRequest ? (
          <span className="requestStatus">Incoming request</span>
        ) : (
          <span className="requestStatus">Outgoing Friend Request</span>
        )}
      </div>
      <div className="requestActions">
        {isIncomingRequest && (
          <FriendRequestActionIcon isAccept>
            <MdCheck size={ICON_SIZE} />
          </FriendRequestActionIcon>
        )}
        <FriendRequestActionIcon>
          <MdClose size={ICON_SIZE} />
        </FriendRequestActionIcon>
      </div>
    </FriendRequestItemContainer>
  );
}

export default FriendRequestListItem;
