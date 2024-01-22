import { Edit } from 'akar-icons';

import { useState } from 'react';
import { Page } from '../../utils/styles';
import UserBanner from '../../components/settings/profile/user-banner';
import {
  ProfileAboutSection,
  ProfileDescriptionField,
  ProfileEditButtonActionsBar,
  ProfileSections,
  SettingsProfileUserDetails
} from '../../utils/styles/settings';
import { Button } from '../../utils/styles/button';
import BackgroundImage from '../../__assets__/test_banner.jpg';
import { updateUserProfile } from '../../utils/api';
import { useAuthContext } from '../../context/auth-context';

export default function SettingsProfilePage() {
  const { user } = useAuthContext();
  const [bannerSource] = useState(user?.profile?.banner || BackgroundImage);
  const [bannerFile, setBannerFile] = useState<File>();
  const [bannerSourceCopy, setBannerSourceCopy] = useState(bannerSource);
  const [about, setAbout] = useState(user?.profile?.about || '');
  const [aboutCopy, setAboutCopy] = useState(about);
  const [isEditing, setIsEditing] = useState(false);

  const isChanged = aboutCopy !== about || bannerFile;

  const reset = () => {
    setAboutCopy(about);
    setBannerSourceCopy(bannerSource);
    setIsEditing(false);
    setBannerFile(undefined);
    URL.revokeObjectURL(bannerSourceCopy);
  };

  const save = async () => {
    const formData = new FormData();
    bannerSource !== bannerSourceCopy && bannerFile && formData.append('banner', bannerFile);
    about !== aboutCopy && formData.append('about', aboutCopy);
    try {
      await updateUserProfile(formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Page>
      <UserBanner
        setBannerFile={setBannerFile}
        bannerSource={bannerSource}
        bannerSourceCopy={bannerSourceCopy}
        setBannerSourceCopy={setBannerSourceCopy}
      />
      <ProfileSections>
        <SettingsProfileUserDetails>
          <div className="avatar" />
          <span className="username">@username</span>
        </SettingsProfileUserDetails>
        <ProfileAboutSection>
          <div className="about_header">
            <label htmlFor="about">About Me</label>
            <Edit size={25} cursor="pointer" onClick={() => setIsEditing((prev) => !prev)} />
          </div>
          <ProfileDescriptionField
            id="about"
            value={aboutCopy}
            disabled={!isEditing}
            onChange={(e) => setAboutCopy(e.target.value)}
            maxLength={200}
          />
        </ProfileAboutSection>
      </ProfileSections>
      {isChanged && (
        <ProfileEditButtonActionsBar>
          <div>
            <span>You have unsaved changes</span>
          </div>
          <div className="buttons">
            <Button size="md" variant="outline" onClick={reset}>
              Reset
            </Button>
            <Button size="md" onClick={save}>
              Save
            </Button>
          </div>
        </ProfileEditButtonActionsBar>
      )}
    </Page>
  );
}
