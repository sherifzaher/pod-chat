import { useDispatch, useSelector } from 'react-redux';
import { RiDeleteBin6Fill } from 'react-icons/ri';

import { MessageAttachmentContainerStyle, MessageAttachmentStyle } from '../../../utils/styles';
import { AppDispatch, RootState } from '../../../store';
import { MessageImageCanvas } from './message-image-canvas';
import { removeAttachment } from '../../../store/slices/message-panel-slice';

export default function MessageAttachmentContainer() {
  const { attachments } = useSelector((state: RootState) => state.messagePanel);

  const dispatch = useDispatch<AppDispatch>();

  return (
    <MessageAttachmentContainerStyle>
      {attachments.map((attachment) => (
        <MessageAttachmentStyle
          key={attachment.id}
          style={{
            display: 'flex',
            alignItems: 'center'
          }}>
          <MessageImageCanvas file={attachment.file} />
          <RiDeleteBin6Fill
            cursor="pointer"
            color="red"
            style={{ position: 'absolute', zIndex: 1, right: 15, top: 10 }}
            size={20}
            onClick={() => dispatch(removeAttachment(attachment))}
          />
          <div>{attachment.file.name}</div>
        </MessageAttachmentStyle>
      ))}
    </MessageAttachmentContainerStyle>
  );
}
