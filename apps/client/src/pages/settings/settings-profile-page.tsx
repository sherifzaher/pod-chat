import { Edit } from 'akar-icons';
import { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { MoonLoader } from 'react-spinners';
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
import BackgroundImage from '../../__assets__/test_banner.jpg';
import { updateUserProfile } from '../../utils/api';
import { AppDispatch, RootState } from '../../store';
import { setUser } from '../../store/slices/user-slice';

export default function SettingsProfilePage() {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const about = user?.profile?.about || '';
  const bannerSource = user?.profile?.banner || BackgroundImage;

  const [isLoading, setIsLoading] = useState(false);
  const [bannerFile, setBannerFile] = useState<File>();
  const [bannerSourceCopy, setBannerSourceCopy] = useState(bannerSource);
  const [aboutCopy, setAboutCopy] = useState(about);
  const [isEditing, setIsEditing] = useState(false);

  const isChanged = useMemo(
    () => aboutCopy !== about || bannerFile,
    [about, aboutCopy, bannerFile]
  );

  const reset = useCallback(() => {
    console.log(user);
    setAboutCopy(about || '');
    setBannerSourceCopy(bannerSource);
    setIsEditing(false);
    setBannerFile(undefined);
    URL.revokeObjectURL(bannerSourceCopy);
  }, [about, bannerSource, bannerSourceCopy, user]);

  const save = useCallback(async () => {
    const formData = new FormData();
    bannerSource !== bannerSourceCopy && bannerFile && formData.append('banner', bannerFile);
    about !== aboutCopy && formData.append('about', aboutCopy);

    try {
      setIsLoading(true);
      const response = await updateUserProfile(formData);
      dispatch(setUser(response.data));
      setBannerFile(undefined);
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [about, aboutCopy, bannerFile, bannerSource, bannerSourceCopy, dispatch]);

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
    </>
  );
}
