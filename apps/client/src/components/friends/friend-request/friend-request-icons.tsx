import { FC } from 'react';
import { MdCheck, MdClose } from 'react-icons/md';
import { FriendRequestActionIcon } from '../../../utils/styles/friends';

type Props = {
  details: FriendRequestDetailsType;
  handleFriendRequest: (type?: HandleFriendRequestAction) => void;
};

export const FriendRequestIcons: FC<Props> = ({ details, handleFriendRequest }) => {
  return (
    <div className="icons">
      {details.incoming && (
        <FriendRequestActionIcon isAccept onClick={() => handleFriendRequest('accept')}>
          <MdCheck />
        </FriendRequestActionIcon>
      )}
      <FriendRequestActionIcon
        onClick={() => (details.incoming ? handleFriendRequest('reject') : handleFriendRequest())}>
        <MdClose />
      </FriendRequestActionIcon>
    </div>
  );
};
