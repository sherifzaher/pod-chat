import { createRef, Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { ModalContainer, ModalContentBody, ModalHeader } from './index';
import GroupRecipientAddForm from '../forms/group-recipient-add-form';
import { OverlayStyle } from '../../utils/styles';

type Props = {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

export default function AddGroupRecipientModal({ setShowModal, showModal }: Props) {
  const ref = createRef<HTMLDivElement>();
  const [type, setType] = useState<ConversationSelectedType>('private');

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
      <ModalContainer showModal={showModal}>
        <ModalHeader>
          <h2>Add Recipient</h2>
          <MdClose cursor="pointer" size={32} onClick={() => setShowModal(false)} />
        </ModalHeader>
        <ModalContentBody>
          <GroupRecipientAddForm />
        </ModalContentBody>
      </ModalContainer>
    </OverlayStyle>
  );
}
