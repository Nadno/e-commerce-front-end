import React, { createContext, useCallback, useState } from 'react';
import Modal from '../components/Modal';
import {
  SetActions,
  SetButtons,
  ModalTypes,
  Provider,
  CreateModal,
} from '../types/modal';

export const ModalRefContext = createContext<Provider | null>(null);

const ModalProvider: React.FC = ({ children }) => {
  const [type, setType] = useState<ModalTypes>('Warn');
  const [message, setMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const [okButton, setOkButton] = useState('');
  const [cancelButton, setCancelButton] = useState('');
  const [handles, setHandles] = useState<Record<string, Function>>({});

  const openModal = useCallback(() => setIsOpen(() => true), []);

  const setButtons: SetButtons = useCallback(
    ({ okButtonText, cancelButtonText }) => {
      if (okButtonText) setOkButton(() => okButtonText);
      if (cancelButtonText)setCancelButton(() => cancelButtonText);
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

  const createModal: CreateModal = {
    Action: useCallback(
      ({ message, okAction, okButtonText, cancelAction, cancelButtonText }) => {
        setButtons({ okButtonText, cancelButtonText });
        setActions({ okAction, cancelAction });

        setType(() => 'Action');
        setMessage(() => message);
      },
      []
    ),

    Warn: useCallback(({ message, okAction, okButtonText }) => {
      setButtons({ okButtonText });
      setActions({ okAction });

      setType(() => 'Warn');
      setMessage(() => message);
    }, []),
  };

  const handleOk = useCallback(() => {
    if (handles.ok) {
      handles.ok();
    }
    setIsOpen(() => false);
    setOkButton(() => '');
  }, [handles]);

  const handleCancel = useCallback(() => {
    if (handles.cancel) {
      handles.cancel();
    }
    setIsOpen(() => false);
    setCancelButton(() => '');
  }, [handles]);

  const ModalType = Modal[type];

  return (
    <ModalRefContext.Provider value={[createModal, openModal]}>
      {children}
      <ModalType
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
