import { FC } from 'react';
import defaultAvatar from '../../__assets__/default_avatar.jpg';
import { MessageItemAvatarStyle } from '../../utils/styles';

type Props = {
  message: Message | GroupMessageType;
};

export const MessageItemAvatar: FC<Props> = ({ message }) => {
  const getProfilePicture = () => {
    const { profile } = message.author;
    // console.log(message);
    return profile && profile.avatar ? profile.avatar : defaultAvatar;
  };

  return <MessageItemAvatarStyle src={getProfilePicture()} alt="avatar" />;
};
