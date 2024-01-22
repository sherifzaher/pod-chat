import { useSelector } from 'react-redux';

import { SetStateAction, useRef } from 'react';
import DefaultProfilePic from '../../../__assets__/default_avatar.jpg';
import { RootState } from '../../../store';
import { UserAvatarContainer, UserAvatarImage } from '../../../utils/styles/settings';
import { FileInput } from '../../../utils/styles/inputs/text-area';

type TUserAvatar = {
  avatarSource: string;
  avatarSourceCopy: string;
  setAvatarSourceCopy: React.Dispatch<SetStateAction<string>>;
  setAvatarFile: React.Dispatch<SetStateAction<File | undefined>>;
};

export default function UserAvatar({
  avatarSource,
  setAvatarSourceCopy,
  avatarSourceCopy,
  setAvatarFile
}: TUserAvatar) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useSelector((state: RootState) => state.user);
  const userAvatar = user?.profile?.avatar || DefaultProfilePic;

  const handleOnFileChange = (e: InputChangeEvent) => {
    e.preventDefault();
    const { files } = e.target;
    if (!files || !files.length) return;
    const firstFile = files.item(0);
    setAvatarSourceCopy(firstFile ? URL.createObjectURL(firstFile) : avatarSource);
    setAvatarFile(firstFile || undefined);
  };

  const handleOnAvatarClick = () => fileInputRef.current?.click();

  return (
    <>
      <UserAvatarContainer onClick={handleOnAvatarClick}>
        <UserAvatarImage src={userAvatar} />
      </UserAvatarContainer>
      <FileInput type="file" ref={fileInputRef} accept="image/*" onChange={handleOnFileChange} />
    </>
  );
}
