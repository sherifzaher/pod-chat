import { Edit } from 'akar-icons';
import { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MoonLoader } from 'react-spinners';

import DefaultProfilePic from '../../__assets__/default_avatar.jpg';
import BackgroundImage from '../../__assets__/test_banner.jpg';
import { OverlayStyle, Page } from '../../utils/styles';
import UserBanner from '../../components/settings/profile/user-banner';
import {
  ProfileAboutSection,
  ProfileDescriptionField,
  ProfileEditButtonActionsBar,
  ProfileSections,
  SettingsProfileUserDetails
} from '../../utils/styles/settings';
import { Button } from '../../utils/styles/button';
import { updateUserProfile } from '../../utils/api';
import { AppDispatch, RootState } from '../../store';
import { setUser } from '../../store/slices/user-slice';
import UserAvatar from '../../components/settings/profile/user-avatar';

export default function SettingsProfilePage() {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const about = user?.profile?.about || '';
  const bannerSource = user?.profile?.banner || BackgroundImage;
  const avatarSource = user?.profile?.avatar || DefaultProfilePic;

  const [isLoading, setIsLoading] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File>();
  const [avatarSourceCopy, setAvatarSourceCopy] = useState(avatarSource);
  const [bannerFile, setBannerFile] = useState<File>();
  const [bannerSourceCopy, setBannerSourceCopy] = useState(bannerSource);
  const [aboutCopy, setAboutCopy] = useState(about);
  const [isEditing, setIsEditing] = useState(false);

  const isChanged = useMemo(
    () => aboutCopy !== about || bannerFile || avatarFile,
    [about, aboutCopy, avatarFile, bannerFile]
  );

  const reset = useCallback(() => {
    console.log(user);
    setAboutCopy(about || '');
    setBannerSourceCopy(bannerSource);
    setAvatarSourceCopy(avatarSource);
    setIsEditing(false);
    setBannerFile(undefined);
    setAvatarFile(undefined);
    URL.revokeObjectURL(bannerSourceCopy);
    URL.revokeObjectURL(avatarSourceCopy);
  }, [about, avatarSource, avatarSourceCopy, bannerSource, bannerSourceCopy, user]);

  const save = useCallback(async () => {
    const formData = new FormData();
    bannerSource !== bannerSourceCopy && bannerFile && formData.append('banner', bannerFile);
    avatarSource !== avatarSourceCopy && avatarFile && formData.append('avatar', avatarFile);
    about !== aboutCopy && formData.append('about', aboutCopy);

    try {
      setIsLoading(true);
      const response = await updateUserProfile(formData);
      dispatch(setUser(response.data));
      setBannerFile(undefined);
      setAvatarFile(undefined);
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [
    about,
    aboutCopy,
    avatarFile,
    avatarSource,
    avatarSourceCopy,
    bannerFile,
    bannerSource,
    bannerSourceCopy,
    dispatch
  ]);

  return (
    <>
      {isLoading && (
        <OverlayStyle>
          <MoonLoader size={40} color="#fff" />
        </OverlayStyle>
      )}
      <Page>
        <UserBanner
          setBannerFile={setBannerFile}
          bannerSource={bannerSource}
          bannerSourceCopy={bannerSourceCopy}
          setBannerSourceCopy={setBannerSourceCopy}
        />
        <ProfileSections>
          <SettingsProfileUserDetails>
            {/* <div className="avatar" /> */}
            <UserAvatar
              avatarSource={avatarSource}
              setAvatarSourceCopy={setAvatarSourceCopy}
              avatarSourceCopy={avatarSourceCopy}
              setAvatarFile={setAvatarFile}
            />
            <span className="username">@{user?.username}</span>
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
    </>
  );
}
