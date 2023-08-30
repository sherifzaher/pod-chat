import { SetStateAction } from 'react';
import styles from './index.module.scss';
import { chatTypes } from '../../utils/constants';

type Props = {
  type: ConversationSelectedType;
  setType: React.Dispatch<SetStateAction<ConversationSelectedType>>;
};

export default function ConversationTypeForm({ type, setType }: Props) {
  return (
    <form className={styles.conversationTypeForm}>
      {chatTypes.map((chatType) => (
        <div key={chatType.type}>
          <input
            checked={type === chatType.type}
            className={styles.radio}
            type="radio"
            name="converationType"
            onChange={() => setType(chatType.type)}
            id={chatType.type}
          />
          <label className={styles.radioLabel} htmlFor={chatType.type}>
            {chatType.label}
          </label>
        </div>
      ))}
    </form>
  );
}
