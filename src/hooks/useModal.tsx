import { useCallback, useState } from 'react';

import Modal from '../components/Modal';
import {
  SetModalAs,
  ModalTypes,
  OpenModal,
  SetActions,
  SetButtons,
} from '../types/modal';

type ModalComponent = React.FC;
type UseModal = (
  modalType?: ModalTypes
) => [ModalComponent, OpenModal, SetModalAs];

const useModal: UseModal = (modalType = 'Warn') => {
  const [type, setType] = useState<ModalTypes>(modalType);
  const [message, setMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const [confirmButton, setConfirmButton] = useState('OK');
  const [cancelButton, setCancelButton] = useState('Cancelar');
  const [handles, setHandles] = useState<Record<string, Function | null>>({
    confirm: null,
    cancel: null,
  });

  const setButtons: SetButtons = useCallback(({ confirmText, cancelText }) => {
    if (confirmText) setConfirmButton(() => confirmText);
    if (cancelText) setCancelButton(() => cancelText);
  }, []);

  const setActions: SetActions = useCallback(
    ({ handleConfirm, handleCancel }) => {
      setHandles(_ => {
        const handles: any = {};
        if (handleConfirm) handles.confirm = handleConfirm;
        if (handleCancel) handles.cancel = handleCancel;
        return handles;
      });
    },
    []
  );

  const handleConfirm = useCallback(() => {
    if (handles.confirm) {
      handles.confirm();
    }
    setIsOpen(() => false);
    setConfirmButton(() => 'OK');
  }, [handles]);

  const handleCancel = useCallback(() => {
    if (handles.cancel) {
      handles.cancel();
    }
    setIsOpen(() => false);
    setCancelButton(() => 'Cancelar');
  }, [handles]);

  const openModal = () => setIsOpen(() => true);

  const setModalAs: SetModalAs = {
    action: ({
      message,
      handleConfirm,
      confirmText,
      handleCancel,
      cancelText,
    }) => {
      setButtons({ confirmText, cancelText });
      setActions({ handleConfirm, handleCancel });

      setType(() => 'Action');
      setMessage(() => message);
    },

    warn: ({ message, handleConfirm, confirmText }) => {
      setButtons({ confirmText });
      setActions({ handleConfirm });

      setType(() => 'Warn');
      setMessage(() => message);
    },
  };

  const ModalType = Modal[type];
  const ModalWrapper: React.FC = () => (
    <ModalType
      message={message}
      isOpen={isOpen}
      cancelText={cancelButton}
      confirmText={confirmButton}
      handleConfirm={handleConfirm}
      handleCancel={handleCancel}
    />
  );

  return [ModalWrapper, openModal, setModalAs];
};

export default useModal;
