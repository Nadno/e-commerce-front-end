import { useContext } from 'react';
import { ModalRefContext } from '../providers/ModalProvider';
import { CreateModal, OpenModal, Buttons } from '../types/modal';

type UseModal = (start?: Partial<Buttons>) => [CreateModal, OpenModal];

const useModal: UseModal = ({ okButtonText, cancelButtonText } = {}) => {
  const ctx = useContext(ModalRefContext);
  if (!ctx) throw new Error('useAccount must be used within AccountProvider');

  const { setType, setIsOpen, setButtons, setActions, setMessage } = ctx;

  setButtons({ okButtonText, cancelButtonText });

  const openModal = () => setIsOpen(() => true);

  const createModal: CreateModal = {
    action: ({
      message,
      okAction,
      okButtonText,
      cancelAction,
      cancelButtonText,
    }) => {
      setButtons({ okButtonText, cancelButtonText });
      setActions({ okAction, cancelAction });

      setType(() => 'Action');
      setMessage(() => message);
    },

    warn: ({ message, okAction, okButtonText }) => {
      setButtons({ okButtonText });
      setActions({ okAction });

      setType(() => 'Warn');
      setMessage(() => message);
    },
  };

  return [createModal, openModal];
};

export default useModal;
