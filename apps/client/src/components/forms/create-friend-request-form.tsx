import React, { Dispatch, SetStateAction, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button, InputContainer, InputField, InputLabel } from '../../utils/styles';
import { useToast } from '../../hooks/useToast';
import styles from './index.module.scss';
import { AppDispatch } from '../../store';
import { createFriendRequestThunk } from '../../store/slices/friends-slice';

type Props = {
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

function CreateFriendRequestFrom({ setShowModal }: Props) {
  const [email, setEmail] = useState('');
  const { success, error } = useToast({ theme: 'dark' });

  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createFriendRequestThunk(email))
      .unwrap()
      .then(() => {
        setShowModal(false);
        success('Friend Request Sent!');
      })
      .catch(() => {
        error('Error sending friend request');
      });
  };

  return (
    <form onSubmit={onSubmit} className={styles.createConversationForm}>
      <InputContainer backgroundColor="#161616">
        <InputLabel>Recipient</InputLabel>
        <InputField value={email} onChange={(e) => setEmail(e.target.value)} />
      </InputContainer>
      <br />
      <Button disabled={!email} type="submit">
        Send
      </Button>
    </form>
  );
}

export default CreateFriendRequestFrom;
