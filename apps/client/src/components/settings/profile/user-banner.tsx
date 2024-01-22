import { SetStateAction, useRef } from 'react';

import { SettingsProfileBanner } from '../../../utils/styles/settings';
import { FileInput } from '../../../utils/styles/inputs/text-area';

type TUserBanner = {
  source: string;
  sourceCopy: string;
  setSourceCopy: React.Dispatch<SetStateAction<string>>;
};

export default function UserBanner({ sourceCopy, setSourceCopy, source }: TUserBanner) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const handleBannerClick = (e: DivMouseEvent) => fileInputRef.current?.click();

  const handleOnFileChange = (e: InputChangeEvent) => {
    e.preventDefault();
    const { files } = e.target;
    if (!files || !files.length) return;
    const firstFile = files.item(0);
    setSourceCopy(firstFile ? URL.createObjectURL(firstFile) : source);
  };

  return (
    <>
      <SettingsProfileBanner
        ref={bannerRef}
        onClick={handleBannerClick}
        backgroundUrl={sourceCopy}
      />
      <FileInput ref={fileInputRef} onChange={handleOnFileChange} type="file" accept="image/*" />
    </>
  );
}
