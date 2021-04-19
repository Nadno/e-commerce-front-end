import React, { AllHTMLAttributes, MouseEvent } from 'react';
import ReactDOM from 'react-dom';

import { PrimaryButton } from '../Button/style';
import { ModalContainer, Overlay } from './style';

interface Props extends AllHTMLAttributes<HTMLDivElement> {
  message: string;
  isOpen: boolean;
}

interface WarnProps extends Props {
  confirmText?: string;
  handleConfirm(e: MouseEvent): void;
}

interface ActionProps extends WarnProps {
  cancelText?: string;
  handleCancel(e: MouseEvent): void;
}

const Modal: React.FC<Props> = ({ isOpen, message, children, ...props }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <Overlay>
      <ModalContainer
        {...props}
        as="div"
        aria-modal="true"
        aria-aria-describedby="modal-message"
      >
        <p className="message" id="modal-message">
          {message}
        </p>
        <hr />
        <div className="buttons">{children}</div>
      </ModalContainer>
    </Overlay>,
    document.getElementById('modals') || document.body
  );
};

const Action: React.FC<ActionProps> = ({
  confirmText,
  cancelText,
  handleConfirm,
  handleCancel,
  ...props
}) => (
  <Modal {...props} role="dialog" className="action">
    <PrimaryButton onClick={handleConfirm} autoFocus={true}>
      {confirmText}
    </PrimaryButton>
    <PrimaryButton onClick={handleCancel}>{cancelText}</PrimaryButton>
  </Modal>
);

const Warn: React.FC<WarnProps> = ({
  confirmText,
  handleConfirm,
  ...props
}) => (
  <Modal {...props} role="alertdialog" className="warn">
    <PrimaryButton onClick={handleConfirm} autoFocus={true}>
      {confirmText}
    </PrimaryButton>
  </Modal>
);

export default {
  Action,
  Warn,
};
