import React, { Dispatch, useRef, SetStateAction, useEffect } from 'react';

import { MessageTextarea } from '../../utils/styles/inputs/text-area';

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

  return (
    <MessageTextarea
      ref={textareaRef}
      maxLength={maxLength}
      placeholder={placeholder}
      value={message}
      onChange={onMessageChange}
      onKeyDown={onKeyDown}
    />
  );
}

export default MessageTextField;
