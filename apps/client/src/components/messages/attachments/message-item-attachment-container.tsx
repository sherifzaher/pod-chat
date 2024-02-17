import React from 'react';

type Props = {
  message: Message | GroupMessageType;
};

export default function MessageItemAttachmentContainer({ message }: Props) {
  return (
    <div>
      {message?.attachments &&
        message.attachments.map((attachment) => (
          <img
            key={attachment.id}
            width="100px"
            height="100px"
            style={{
              objectFit: 'contain',
              objectPosition: 'center'
            }}
            src={attachment.attachmentUrl}
            alt=""
          />
        ))}
    </div>
  );
}
