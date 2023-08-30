import { createRef, Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { ModalContainer, ModalContentBody, ModalHeader } from './index';
import { OverlayStyle } from '../../utils/styles';
import CreateGroupForm from '../forms/create-group-form';

type Props = {
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

export default function CreateGroupModal({ setShowModal }: Props) {
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
          <h2>Create a Group</h2>
          <MdClose size={32} onClick={() => setShowModal(false)} />
        </ModalHeader>
        <ModalContentBody>
          <CreateGroupForm closeModal={() => setShowModal(false)} />
        </ModalContentBody>
      </ModalContainer>
    </OverlayStyle>
  );
}
