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

export default function SettingsProfilePage() {
  const [about, setAbout] = useState('how are u?');
  const [editedAbout, setEditedAbout] = useState(about);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Page>
      <UserBanner />
      <ProfileSections>
        <SettingsProfileUserDetails>
          <div className="avatar" />
          <span className="username">@username</span>
        </SettingsProfileUserDetails>
        <ProfileAboutSection>
          <div className="about_header">
            <label htmlFor="about">About Me</label>
            <Edit size={25} onClick={() => setIsEditing((prev) => !prev)} />
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
      {editedAbout !== about && (
        <ProfileEditButtonActionsBar>
          <div>
            <span>You have unsaved changes</span>
          </div>
          <div className="buttons">
            <Button size="md" variant="outline">
              Reset
            </Button>
            <Button size="md">Save</Button>
          </div>
        </ProfileEditButtonActionsBar>
      )}
    </Page>
  );
}
