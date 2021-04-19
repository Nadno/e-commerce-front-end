import { Dispatch, SetStateAction } from 'react';

export type Actions = { handleConfirm?: () => void; handleCancel?: () => void };
export type Buttons = {
  confirmText?: string;
  cancelText?: string;
};
export type ModalTypes = 'Warn' | 'Action';
export type OpenModal = () => void;
export type SetActions = ({}: Actions) => void;
export type SetButtons = ({}: Buttons) => void;

interface CreateModalParams extends Actions, Buttons {
  message: string;
}

export type CreateModalMethods = ({}: CreateModalParams) => void;

export type SetModalAs = Record<string, CreateModalMethods>;

export type Provider = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setMessage: Dispatch<SetStateAction<string>>;
  setType: Dispatch<SetStateAction<ModalTypes>>;
  setButtons: SetButtons;
  setActions: SetActions;
};
