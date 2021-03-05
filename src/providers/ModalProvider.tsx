import React, { createContext, useCallback, useState } from 'react';
import Modal from '../components/Modal';

type Action = { okAction?: () => void; cancelAction?: () => void };
export type OpenModal = (message: string) => void;
export type SetActions = ({}: Action) => void;
export type SetButtons = ({}: {
  okButtonText: string;
  cancelButtonText: string;
}) => void;

export const ModalRefContext = createContext<{
  openModal: OpenModal;
  setActions: SetActions;
  setButtons: SetButtons;
} | null>(null);

const ModalProvider: React.FC = ({ children }) => {
  const [message, setMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [handles, setHandles] = useState<Record<string, Function>>({});
  const [okButton, setOkButton] = useState('');
  const [cancelButton, setCancelButton] = useState('');

  const openModal: OpenModal = useCallback(message => {
    setMessage(_ => message);
    setIsOpen(_ => true);
  }, []);

  const setButtons: SetButtons = useCallback(
    ({ okButtonText, cancelButtonText }) => {
      setOkButton(_ => okButtonText);
      setCancelButton(_ => cancelButtonText);
    },
    []
  );

  const setActions: SetActions = useCallback(({ okAction, cancelAction }) => {
    setHandles(_ => {
      const handles: any = {};
      if (okAction) handles.ok = okAction;
      if (cancelAction) handles.cancel = cancelAction;
      return handles;
    });
  }, []);

  const handleOk = useCallback(() => {
    if (handles.ok) {
      handles.ok();
    }
    setIsOpen(_ => false);
    setOkButton('');
  }, [handles]);

  const handleCancel = useCallback(() => {
    if (handles.cancel) {
      handles.cancel();
    }
    setIsOpen(_ => false);
    setCancelButton('');
  }, [handles]);

  return (
    <ModalRefContext.Provider
      value={{
        openModal,
        setActions,
        setButtons,
      }}
    >
      {children}
      <Modal
        message={message}
        isOpen={isOpen}
        cancelText={cancelButton}
        okText={okButton}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </ModalRefContext.Provider>
  );
};

export default ModalProvider;
