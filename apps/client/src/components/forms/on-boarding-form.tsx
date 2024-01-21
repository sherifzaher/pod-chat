import { useState } from 'react';
import { BiCloudUpload } from 'react-icons/bi';
import { FiFileMinus } from 'react-icons/fi';

import {
  FileInput,
  OnBoardingAboutField,
  OnBoardingInputField,
  SubmitOnboardingFormButton,
  UploadAvatarButton,
  UploadedAvatar,
  UploadedAvatarContainer
} from '../../utils/styles/inputs/text-area';
import styles from './index.module.scss';
import { completeUserProfile } from '../../utils/api';

export default function OnBoardingForm() {
  const [userData, setUserData] = useState({
    username: '',
    about: ''
  });
  const [file, setFile] = useState<File>();
  const [source, setSource] = useState('');
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length) {
      const imageFile = files.item(0);
      if (imageFile) {
        setSource(URL.createObjectURL(imageFile));
        setFile(imageFile);
      }
    }
  };

  const handleRemoveFile = () => {
    setFile(undefined);
    setSource('');
  };

  const handleOnChangeInputFields = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (file) {
      const data = new FormData();
      data.append('file', file);
      data.append('username', userData.username);
      data.append('about', userData.about);
      const response = await completeUserProfile(data);
      console.log(response);
    }
  };

  return (
    <form className={styles.onboardingForm}>
      <div>
        <label className={styles.onboardingLabel} htmlFor="username">
          Username
        </label>
      </div>
      <OnBoardingInputField
        className={styles.onboardingInput}
        onChange={handleOnChangeInputFields}
        id="username"
        name="username"
        type="text"
        placeholder="@yourusername"
        value={userData.username}
      />

      <div>
        <label htmlFor="about" className={styles.onboardingLabel}>
          About Yourself
        </label>
      </div>
      <OnBoardingAboutField
        onChange={handleOnChangeInputFields}
        value={userData.about}
        id="about"
        name="about"
        maxLength={200}
      />
      {source && (
        <UploadedAvatarContainer onClick={handleRemoveFile}>
          <div className="side">
            <UploadedAvatar src={source} alt="user Avatar" />
            <span className="fileName">{file?.name}</span>
          </div>
          <FiFileMinus size={30} color="#ff0000" cursor="pointer" />
        </UploadedAvatarContainer>
      )}
      <UploadAvatarButton>
        <label htmlFor="file">
          <BiCloudUpload size={30} />
          Upload your photo
        </label>
        <FileInput id="file" type="file" accept="image/*" onChange={onFileChange} />
      </UploadAvatarButton>
      <SubmitOnboardingFormButton onClick={onSubmit}>Submit</SubmitOnboardingFormButton>
    </form>
  );
}
