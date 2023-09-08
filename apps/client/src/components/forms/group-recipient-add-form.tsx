import React, { useState } from 'react';
import styles from './index.module.scss';
import { Button, InputContainer, InputField, InputLabel } from '../../utils/styles';

export default function GroupRecipientAddForm() {
  const [query, setQuery] = useState('');

  const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={onSubmit} className={styles.createConversationForm}>
      <InputContainer backgroundColor="#161616">
        <InputLabel>Recipient</InputLabel>
        <InputField value={query} onChange={(e) => setQuery(e.target.value)} />
      </InputContainer>
      <br />
      <Button disabled={!query} type="submit">
        Add Recipient
      </Button>
    </form>
  );
}
