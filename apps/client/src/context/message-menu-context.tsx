import { createContext, Dispatch, SetStateAction, useContext } from 'react';

type MessageMenuContextType = {
  message: Message | null;
  setMessage: Dispatch<SetStateAction<Message | null>>;
  editMessage: Message | null;
  setEditMessage: Dispatch<SetStateAction<Message | null>>;
};

export const MessageMenuContext = createContext<MessageMenuContextType>({
  message: null,
  setMessage: () => {},
  editMessage: null,
  setEditMessage: () => {}
});

export const useMessageContextMenu = () => {
  const context = useContext(MessageMenuContext);
  if (!context) throw new Error("Please use useMessageContextMenu inside it's provider");

  return context;
};
