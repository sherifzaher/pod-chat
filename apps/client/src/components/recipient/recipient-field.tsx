import { Dispatch, SetStateAction } from 'react';

import { InputContainer, InputField, InputLabel } from '../../utils/styles';
import SelectedRecipientChip from './selected-recipient-chip';

type Props = {
  selectedUser: User | undefined;
  setSelectedUser: Dispatch<SetStateAction<User | undefined>>;
  setQuery: Dispatch<SetStateAction<string>>;
};

export default function RecipientField({ selectedUser, setSelectedUser, setQuery }: Props) {
  return (
    <section>
      <InputContainer backgroundColor="#161616">
        <InputLabel>Recipient</InputLabel>
        {selectedUser ? (
          <SelectedRecipientChip
            user={selectedUser}
            handleOnClick={() => setSelectedUser(undefined)}
          />
        ) : (
          <InputField onChange={(e) => setQuery(e.target.value)} />
        )}
      </InputContainer>
    </section>
  );
}
