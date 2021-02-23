import React from 'react';

import Cart from '../src/components/Cart';
import Header from '../src/components/Header';


const CartPage: React.FC = () => {
  return (
    <>
      <Header />
      <Cart items={['1', '2']} />
    </>
  );
}

export default CartPage;