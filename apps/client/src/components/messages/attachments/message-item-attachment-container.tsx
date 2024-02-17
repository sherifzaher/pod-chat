import { MdClose } from 'react-icons/md';
import React, { useState } from 'react';
import { useKeydown } from '../../../hooks';
import { OverlayStyle } from '../../../utils/styles';
import styles from './index.module.scss';

type Props = {
  message: Message | GroupMessageType;
};

export default function MessageItemAttachmentContainer({ message }: Props) {
  const [showOverlay, setShowOverlay] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const onClick = (key: string) => {
    setShowOverlay(true);
    setImageUrl(key);
  };

  const handleKeydown = (e: KeyboardEvent) => e.key === 'Escape' && setShowOverlay(false);
  useKeydown(handleKeydown);

  return (
    <>
      {showOverlay && (
        <OverlayStyle>
          <MdClose className={styles.closeIcon} onClick={() => setShowOverlay(false)} />
          <img src={imageUrl} alt="overlay" />
        </OverlayStyle>
      )}
      <div>
        {message?.attachments &&
          message.attachments.map((attachment) => (
            <img
              key={attachment.id}
              width="100px"
              height="100px"
              style={{
                objectFit: 'contain',
                objectPosition: 'center',
                cursor: 'pointer'
              }}
              onClick={() => onClick(attachment.attachmentUrl)}
              src={attachment.attachmentUrl}
              alt=""
            />
          ))}
      </div>
    </>
  );
}
