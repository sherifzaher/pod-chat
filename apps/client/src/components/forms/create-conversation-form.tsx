import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Button, InputContainer, InputLabel, TextField } from '../../utils/styles';
import { searchUsers } from '../../utils/api';

import { AppDispatch } from '../../store';
import { createConversationThunk } from '../../store/slices/conversation-slice';
import useDebounce from '../../hooks/useDebounce';

import RecipientResultContainer from '../recipient/recipient-result-container';
import RecipientField from '../recipient/recipient-field';

import styles from './index.module.scss';

type Props = {
  closeModal: () => void;
};

export default function CreateConversationForm({ closeModal }: Props) {
  const [message, setMessage] = useState('');
  const [query, setQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User>();

  const debouncedValue = useDebounce<typeof query>(query, 1000);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    if (debouncedValue) {
      setSearching(true);
      searchUsers(debouncedValue)
        .then((res) => setUsers(res.data))
        .catch((err) => console.log(err))
        .finally(() => setSearching(false));
    } else {
      setUsers([]);
    }
  }, [debouncedValue]);

  const onSubmit = useCallback(
    (e: React.ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!message || !selectedUser) return;

      const messageParams = {
        email: selectedUser.email,
        message
      };

      dispatch(createConversationThunk(messageParams))
        .unwrap()
        .then(({ data }) => {
          closeModal();
          navigate(`/conversations/${data.id}`);
        })
        .catch((err) => console.log(err));
    },
    [closeModal, dispatch, message, navigate, selectedUser]
  );

  const handleSelectUser = useCallback((user: User) => {
    setSelectedUser(user);
    setUsers([]);
    setQuery('');
  }, []);

  return (
    <form className={styles.createConversationForm} onSubmit={onSubmit}>
      <RecipientField
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        setQuery={setQuery}
      />
      {!selectedUser && users.length > 0 && query && (
        <RecipientResultContainer userResults={users} handleSelectUser={handleSelectUser} />
      )}
      <section className={styles.message}>
        <InputContainer backgroundColor="#161616">
          <InputLabel>Message (optional)</InputLabel>
          <TextField value={message} onChange={(e) => setMessage(e.target.value)} />
        </InputContainer>
      </section>
      <Button type="submit">Create Conversation</Button>
    </form>
  );
}
