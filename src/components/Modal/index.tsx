import React, { MouseEvent } from 'react';
import Button from '../Button';
import { ModalContainer, Background } from './style';

interface Props {
  message: string;
  isOpen: boolean;
  cancelText?: string;
  okText?: string;
  handleOk(e: MouseEvent): void;
  handleCancel(e: MouseEvent): void;
}

const Modal: React.FC<Props> = ({
  isOpen,
  message,
  okText,
  cancelText,
  handleOk,
  handleCancel,
}) => (
  <>
    {isOpen ? (
      <Background>
        <ModalContainer>
          <span className="message">{message}</span>
          <hr />
          <div className="buttons">
            <Button.Secondary onClick={handleOk}>
              {okText ? okText : 'OK'}
            </Button.Secondary>
            <Button.Secondary onClick={handleCancel}>
              {cancelText ? cancelText : 'Cancelar'}
            </Button.Secondary>
          </div>
        </ModalContainer>
      </Background>
    ) : null}
  </>
);

export default Modal;
