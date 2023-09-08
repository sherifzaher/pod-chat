import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './index.module.scss';
import { Button, InputContainer, InputField, InputLabel } from '../../utils/styles';
import { addGroupRecipient } from '../../utils/api';
import { useToast } from '../../hooks/useToast';

export default function GroupRecipientAddForm() {
  const { id: groupId } = useParams();
  const [email, setEmail] = useState('');

  const { success, error } = useToast({ theme: 'dark' });

  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await addGroupRecipient({ email, id: Number(groupId!) });
      success('Recipient Added to Group');
      setEmail('');
    } catch (err) {
      console.log(err);
      error('Failed to add user');
    }
  };

  return (
    <form onSubmit={onSubmit} className={styles.createConversationForm}>
      <InputContainer backgroundColor="#161616">
        <InputLabel>Recipient</InputLabel>
        <InputField value={email} onChange={(e) => setEmail(e.target.value)} />
      </InputContainer>
      <br />
      <Button disabled={!email} type="submit">
        Add Recipient
      </Button>
    </form>
  );
}
