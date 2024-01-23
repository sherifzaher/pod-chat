import { CirclePlusFill } from 'akar-icons';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FileInput } from '../../utils/styles/inputs/text-area';
import { AppDispatch, RootState } from '../../store';
import { addAttachment } from '../../store/slices/message-panel-slice';
import { FileLimit } from '../../utils/constants';
import { useToast } from '../../hooks/useToast';

export default function MessageAttachmentActionIcon() {
  const attachmentIconRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { attachmentCounter, attachments } = useSelector((state: RootState) => state.messagePanel);
  const { error } = useToast({ theme: 'dark' });

  const dispatch = useDispatch<AppDispatch>();

  const onClick = (e: DivMouseEvent) => fileInputRef.current?.click();

  const onChange = (e: InputChangeEvent) => {
    e.preventDefault();
    const file = e.target.files?.item(0);
    if (attachments.length >= 5) {
      return error('Maximum 5 attachments', { position: 'top-center' });
    }
    if (file) {
      if (file.size >= FileLimit.MEGABYTE) {
        return error('File exceeds limit: 1MB', { position: 'top-center' });
      }
      dispatch(addAttachment({ id: attachmentCounter + 1, file }));
    }
  };

  return (
    <div ref={attachmentIconRef} onClick={onClick}>
      <CirclePlusFill size={30} cursor="pointer" />
      <FileInput onChange={onChange} ref={fileInputRef} type="file" accept="image/*" />
    </div>
  );
}
