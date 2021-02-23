import { useContext } from 'react';
import { ContextAccount } from '../StoreProvider';

import { CartAction } from '../hooks';

const useCart = () => {
  const ctx = useContext(ContextAccount);
  if (!ctx) throw new Error('useAccount must be used within AccountProvider');

  const { cart, setCart } = ctx;

  const addToCart: CartAction = (id) => {
    setCart((cart) => {
      if (cart.includes(id)) return cart;
      return [...cart, id];
    });
  };

  const removeFromCart: CartAction = (id) => {
    setCart((cart) => {
      const indexId = cart.indexOf(id);

      return ~indexId ? cart.slice(indexId, 1) : cart;
    });
  };

  return {
    cart,
    addToCart,
    removeFromCart,
  };
};

export default useCart;
