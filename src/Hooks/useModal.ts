import { useContext } from 'react';
import {
  ModalRefContext,
  OpenModal,
  SetActions,
  SetButtons,
} from '../providers/ModalProvider';

const useModal = (): [OpenModal, SetActions, SetButtons] => {
  const ctx = useContext(ModalRefContext);
  if (!ctx) throw new Error('useAccount must be used within AccountProvider');

  const { openModal, setActions, setButtons } = ctx;
  return [openModal, setActions, setButtons];
};

export default useModal;
