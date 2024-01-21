import { Edit } from 'akar-icons';

import { Page } from '../../utils/styles';
import UserBanner from '../../components/settings/profile/user-banner';
import {
  ProfileAboutSection,
  ProfileDescriptionField,
  ProfileSections,
  SettingsProfileUserDetails
} from '../../utils/styles/settings';

export default function SettingsProfilePage() {
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
            <Edit size={25} />
          </div>
          <ProfileDescriptionField maxLength={200} id="about" disabled />
        </ProfileAboutSection>
      </ProfileSections>
    </Page>
  );
}
