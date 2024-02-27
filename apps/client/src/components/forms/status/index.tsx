import { useState, useContext, SetStateAction, Dispatch } from 'react';
import { useDispatch } from 'react-redux';
import {
  InputContainer,
  InputContainerHeader,
  InputField,
  InputLabel
} from '../../../utils/styles';
import { Button } from '../../../utils/styles/button';
import styles from '../index.module.scss';
import { useAuth } from '../../../hooks/useAuth';
import { useToast } from '../../../hooks/useToast';
import { updateStatusMessage } from '../../../utils/api';
import { AppDispatch } from '../../../store';
import { setUser } from '../../../store/slices/user-slice';

type Props = {
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

export const UpdateUserStatusForm = ({ setShowModal }: Props) => {
  const { user } = useAuth();
  const { success, error } = useToast({ theme: 'dark' });
  const dispatch = useDispatch<AppDispatch>();

  const [statusMessage, setStatusMessage] = useState(user?.presence?.statusMessage || '');

  const saveStatus = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateStatusMessage({ statusMessage })
      .then((res) => {
        success('Updated Status!');
        dispatch(setUser(res.data));
        setShowModal(false);
      })
      .catch((err) => {
        console.log(err);
        error('Failed to Update Status');
      });
  };

  return (
    <form className={styles.updateUserStatusForm} onSubmit={saveStatus}>
      <InputContainer backgroundColor="#0A0A0A">
        <InputContainerHeader>
          <InputLabel htmlFor="message">Message</InputLabel>
        </InputContainerHeader>
        <InputField
          type="test"
          id="message"
          value={statusMessage}
          onChange={(e) => setStatusMessage(e.target.value)}
        />
      </InputContainer>
      <div className={styles.updateStatusFormButtons}>
        <Button size="md">Save</Button>
      </div>
    </form>
  );
};
