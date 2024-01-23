import React, { Dispatch, useRef, SetStateAction, useEffect, useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { MessageTextarea } from '../../utils/styles/inputs/text-area';
import { addAttachment } from '../../store/slices/message-panel-slice';
import { AppDispatch, RootState } from '../../store';
import { AttachmentCount, FileLimit } from '../../utils/constants';
import { useToast } from '../../hooks/useToast';

interface MessageTextFieldProps {
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  maxLength: number;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
}

function MessageTextField({
  setMessage,
  message,
  maxLength,
  onKeyDown,
  placeholder
}: MessageTextFieldProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { error } = useToast({ theme: 'dark' });
  const dispatch = useDispatch<AppDispatch>();
  const { attachments, attachmentCounter } = useSelector((state: RootState) => state.messagePanel);

  const onMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setMessage(e.target.value);
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = '5px';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  // Resize input field after sending the message
  useEffect(() => {
    if (message.length === 0 && textareaRef && textareaRef.current) {
      textareaRef.current.style.height = '5px';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const handleFileAdd = useCallback(
    (files: FileList) => {
      const filesArray = Array.from(files);
      let localCounter = attachmentCounter;
      const maxFilesDropped = AttachmentCount.count - attachments.length;
      if (maxFilesDropped === 0) return error('Max files reached');

      for (let i = 0; i < filesArray.length; i++) {
        if (i === maxFilesDropped) break;
        if (filesArray[i].size >= FileLimit.MEGABYTE) return error('File size exceeds max 1MB');
        dispatch(addAttachment({ id: localCounter++, file: filesArray[i] }));
      }
    },
    [attachmentCounter, attachments.length, dispatch, error]
  );

  const onDrop = useCallback(
    (e: DragElementEvent) => {
      e.stopPropagation();
      e.preventDefault();
      const files = e.dataTransfer?.files;
      files && handleFileAdd(files);
    },
    [handleFileAdd]
  );

  const onPaste = (e: ClipboardPasteEvent) => {
    const { files } = e.clipboardData;
    files && handleFileAdd(files);
  };

  return (
    <MessageTextarea
      onDrop={onDrop}
      ref={textareaRef}
      maxLength={maxLength}
      placeholder={placeholder}
      value={message}
      onChange={onMessageChange}
      onKeyDown={onKeyDown}
      onPaste={onPaste}
    />
  );
}

export default MessageTextField;
