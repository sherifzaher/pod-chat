import { SetStateAction, useRef } from 'react';

import { SettingsProfileBanner } from '../../../utils/styles/settings';
import { FileInput } from '../../../utils/styles/inputs/text-area';

type TUserBanner = {
  bannerSource: string;
  bannerSourceCopy: string;
  setBannerSourceCopy: React.Dispatch<SetStateAction<string>>;
  setBannerFile: React.Dispatch<SetStateAction<File | undefined>>;
};

export default function UserBanner({
  bannerSource,
  setBannerSourceCopy,
  bannerSourceCopy,
  setBannerFile
}: TUserBanner) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const handleBannerClick = (e: DivMouseEvent) => fileInputRef.current?.click();

  const handleOnFileChange = (e: InputChangeEvent) => {
    e.preventDefault();
    const { files } = e.target;
    if (!files || !files.length) return;
    const firstFile = files.item(0);
    setBannerSourceCopy(firstFile ? URL.createObjectURL(firstFile) : bannerSource);
    setBannerFile(firstFile || undefined);
  };

  return (
    <>
      <SettingsProfileBanner
        ref={bannerRef}
        onClick={handleBannerClick}
        backgroundUrl={bannerSourceCopy}
      />
      <FileInput ref={fileInputRef} onChange={handleOnFileChange} type="file" accept="image/*" />
    </>
  );
}
