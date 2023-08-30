import { useCallback } from 'react';
import {
  RecipientResultContainerStyle,
  RecipientResultItem,
  RecipientScrollableItemContainer
} from '../../utils/styles';

type Props = {
  userResults: User[];
  handleSelectUser: (user: User) => void;
};

export default function RecipientResultContainer({ userResults, handleSelectUser }: Props) {
  const handleSelectSelection = useCallback(
    (user: User) => handleSelectUser(user),
    [handleSelectUser]
  );

  return (
    <RecipientResultContainerStyle>
      <RecipientScrollableItemContainer>
        {userResults.map((user) => (
          <RecipientResultItem key={user.id} onClick={() => handleSelectSelection(user)}>
            <span>{user.email}</span>
          </RecipientResultItem>
        ))}
      </RecipientScrollableItemContainer>
    </RecipientResultContainerStyle>
  );
}
