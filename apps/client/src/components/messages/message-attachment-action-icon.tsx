import { CirclePlusFill } from 'akar-icons';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FileInput } from '../../utils/styles/inputs/text-area';
import { AppDispatch, RootState } from '../../store';
import { addAttachment } from '../../store/slices/message-panel-slice';
import { AttachmentCount, FileLimit } from '../../utils/constants';
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
    const { files } = e.target;
    if (!files) return;

    const filesArray = Array.from(files);
    let localCounter = attachmentCounter;
    const maxFilesDropped = AttachmentCount.count - attachments.length;
    if (maxFilesDropped === 0) return error('Max files reached');

    for (let i = 0; i < filesArray.length; i++) {
      if (i === maxFilesDropped) break;
      if (filesArray[i].size >= FileLimit.MEGABYTE) return error('File size exceeds max 1MB');
      dispatch(addAttachment({ id: localCounter++, file: filesArray[i] }));
    }
  };

  return (
    <div ref={attachmentIconRef} onClick={onClick}>
      <CirclePlusFill size={30} cursor="pointer" />
      <FileInput onChange={onChange} ref={fileInputRef} multiple type="file" accept="image/*" />
    </div>
  );
}
