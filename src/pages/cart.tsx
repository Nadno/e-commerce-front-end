import React, { useCallback, useEffect, useState } from 'react';

import useCart from '../hooks/useCart';

import Head from 'next/head';
import Cart, { CartItem } from '../components/Cart';
import Header from '../components/Header';
import Checkout from '../components/Checkout';
import useAccount from '../hooks/useAccount';
import SignUp from '../screen/sign-up';
import { GridContainer } from '../components/Container/style';

const CartPage: React.FC = () => {
  const { id } = useAccount().account;
  const { cart, removeFromCart } = useCart();

  const [finalPrice, setFinalPrice] = useState(0);
  const [cartItems, setCartItems] = useState<Record<string, CartItem>>({});

  const getTotalPrice = useCallback(() => {
    const total = Object.entries(cartItems).reduce(
      (acc, [, { quantity, price }]) => (acc += price * quantity),
      0
    );

    setFinalPrice(total);
  }, [cartItems, setFinalPrice]);

  useEffect(getTotalPrice, [cartItems]);

  const handleRemoveCartItem = useCallback(
    (productId: string) => {
      removeFromCart(productId);
      setCartItems(cartItems => {
        delete cartItems[productId];
        return { ...cartItems };
      });
    },
    [setCartItems, removeFromCart]
  );

  return (
    <GridContainer>
      <Head>
        <title>Carrinho</title>
      </Head>
      <Header />

      <Cart
        items={cart}
        cartItems={cartItems}
        setCartItems={setCartItems}
        removeItem={handleRemoveCartItem}
      />

      {id != null ? (
        <Checkout cartItems={cartItems} finalPrice={finalPrice} />
      ) : (
        <SignUp goToPath="/cart" />
      )}
    </GridContainer>
  );
};

export default CartPage;
