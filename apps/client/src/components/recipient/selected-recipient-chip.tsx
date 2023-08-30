import { CircleX } from 'akar-icons';

import { SelectedRecipientPillStyle } from '../../utils/styles';

type Props = {
  user: User;
  handleOnClick: () => void;
};

export default function SelectedRecipientChip({ user, handleOnClick }: Props) {
  return (
    <SelectedRecipientPillStyle>
      <div className="container">
        <span>{user?.email}</span>
        <CircleX className="icon" size="20px" onClick={handleOnClick} />
      </div>
    </SelectedRecipientPillStyle>
  );
}
