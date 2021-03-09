import React, { MouseEvent } from 'react';
import Button from '../Button';
import { ModalContainer, Background } from './style';

interface Props {
  className: string;
  message: string;
  isOpen: boolean;
}

interface WarnProps extends Omit<Props, 'type' | 'className'> {
  okText?: string;
  handleOk(e: MouseEvent): void;
}

interface ActionProps extends WarnProps {
  cancelText?: string;
  handleCancel(e: MouseEvent): void;
}

const Modal: React.FC<Props> = ({ isOpen, message, className, children }) => (
  <>
    {isOpen ? (
      <Background>
        <ModalContainer className={className}>
          <span className="message">{message}</span>
          <hr />
          <div className="buttons">{children}</div>
        </ModalContainer>
      </Background>
    ) : null}
  </>
);

const Action: React.FC<ActionProps> = ({
  okText,
  cancelText,
  handleOk,
  handleCancel,
  ...props
}) => (
  <Modal {...props} className="action">
    <Button.Primary onClick={handleOk}>{okText ? okText : 'OK'}</Button.Primary>
    <Button.Primary onClick={handleCancel}>
      {cancelText ? cancelText : 'Cancelar'}
    </Button.Primary>
  </Modal>
);

const Warn: React.FC<WarnProps> = ({ okText, handleOk, ...props }) => (
  <Modal {...props} className="warn">
    <Button.Primary onClick={handleOk}>{okText ? okText : 'OK'}</Button.Primary>
  </Modal>
);

export default {
  Action,
  Warn,
};
