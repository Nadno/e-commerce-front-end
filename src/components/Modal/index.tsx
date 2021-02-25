import React, {
  useState,
  ReactNode,
  forwardRef,
  useCallback,
  useImperativeHandle,
} from 'react';

import Button from '../Button';
import Div from './style';

interface Props {
  open?: boolean;
  cancelText?: string;
  okText?: string;
  okAction?: Function;
}

export interface ModalHandle {
  openModal(message: string): void;
}

const Modal: React.ForwardRefRenderFunction<ModalHandle, Props> = (
  { open = false, okText, cancelText, okAction },
  ref
) => {
  const [isOpen, setIsOpen] = useState(open);
  const [message, setMessage] = useState('');

  const openModal = useCallback((message: string) => {
    setMessage(message);
    setIsOpen(true);
  }, [message]);

  useImperativeHandle(ref, () => ({
    openModal,
  }));

  const handleCancel = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleOk = useCallback(() => {
    setIsOpen(false);
    if (okAction) okAction();
  }, []);

  return (
    <>
      {isOpen ? (
        <Div>
          <span className="message">{message}</span>
          <hr />
          <div className="buttons">
            <Button.Secondary onClick={handleOk}>
              {okText ? okText : 'OK'}
            </Button.Secondary>
            <Button.Primary onClick={handleCancel}>
              {cancelText ? cancelText : 'Cancelar'}
            </Button.Primary>
          </div>
        </Div>
      ) : null}
    </>
  );
};

export default forwardRef(Modal);
