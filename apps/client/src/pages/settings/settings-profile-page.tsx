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

export default function SettingsProfilePage() {
  const [source] = useState(BackgroundImage);
  const [sourceCopy, setSourceCopy] = useState(source);
  const [about, setAbout] = useState('how are u?');
  const [editedAbout, setEditedAbout] = useState(about);
  const [isEditing, setIsEditing] = useState(false);

  const isChanged = editedAbout !== about || source !== sourceCopy;

  const reset = () => {
    setEditedAbout(about);
    setSourceCopy(source);
    setIsEditing(false);
  };

  return (
    <Page>
      <UserBanner source={source} sourceCopy={sourceCopy} setSourceCopy={setSourceCopy} />
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
            value={editedAbout}
            disabled={!isEditing}
            onChange={(e) => setEditedAbout(e.target.value)}
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
            <Button size="md">Save</Button>
          </div>
        </ProfileEditButtonActionsBar>
      )}
    </Page>
  );
}
