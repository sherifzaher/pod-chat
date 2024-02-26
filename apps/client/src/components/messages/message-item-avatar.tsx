import { FC } from 'react';
import defaultAvatar from '../../__assets__/default_avatar.jpg';
import { UserAvatarContainer } from '../../utils/styles';

type Props = {
  user: User;
};

export const UserAvatar: FC<Props> = ({ user }) => {
  const getProfilePicture = () => {
    const { profile } = user;
    return profile && profile.avatar ? profile.avatar : defaultAvatar;
  };

  return <UserAvatarContainer src={getProfilePicture()} alt="avatar" />;
};
