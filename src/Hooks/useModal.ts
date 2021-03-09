import { useContext } from 'react';
import { ModalRefContext } from '../providers/ModalProvider';
import { CreateModal, OpenModal } from '../types/modal';

const useModal = (): [CreateModal, OpenModal] => {
  const ctx = useContext(ModalRefContext);
  if (!ctx) throw new Error('useAccount must be used within AccountProvider');

  const [createModal, openModal] = ctx;

  return [createModal, openModal];
};

export default useModal;
