import React, { useCallback, useRef, useState } from 'react';
import useAccount from '../src/hooks/useAccount';
import useCart from '../src/hooks/useCart';

import Cart from '../src/components/Cart';
import Header from '../src/components/Header';
import Modal, { ModalHandle } from '../src/components/Modal';

const CartPage: React.FC = () => {
  const { token, secondsToExpire } = useAccount();
  const { cart, removeFromCart } = useCart();
  const [step, setStep] = useState(0);

  const modalRef = useRef<ModalHandle>(null);

  const submitStep = useCallback(() => {
    if (secondsToExpire(token) < 1) {

    } else {
      setStep((prev) => prev + 1);
    }
  }, []);

  return (
    <>
      <Header />
      <Cart items={cart} removeItem={removeFromCart} submitStep={submitStep} />
      <Modal ref={modalRef} />
    </>
  );
};

export default CartPage;
