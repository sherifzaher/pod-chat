import { Dispatch, SetStateAction, createRef, useCallback, useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import { OverlayStyle } from '../../utils/styles';
import { ModalContainer, ModalContentBody, ModalHeader } from '.';
import CreateConversationForm from '../forms/create-conversation-form';
import CreateFriendRequestFrom from '../forms/create-friend-request-form';

type Props = {
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

function CreateFriendRequestModal({ setShowModal }: Props) {
  const ref = createRef<HTMLDivElement>();

  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) =>
      e.key === 'Escape' && setShowModal(false);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [setShowModal]);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const { current } = ref;
      if (current === e.target) {
        setShowModal(false);
      }
    },
    [ref, setShowModal]
  );
  return (
    <OverlayStyle ref={ref} onClick={handleOverlayClick}>
      <ModalContainer>
        <ModalHeader>
          <h2>Send a Friend Request</h2>
          <MdClose size={32} onClick={() => setShowModal(false)} />
        </ModalHeader>
        <ModalContentBody>
          <CreateFriendRequestFrom setShowModal={setShowModal} />
        </ModalContentBody>
      </ModalContainer>
    </OverlayStyle>
  );
}

export default CreateFriendRequestModal;
