import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';

import Product from '../Product';
import { Input } from '../Input';
import { CartList } from './style';
import Container from '../Container/';
import { PrimaryButton } from '../Button/style';

import handleRequest from '../../utils/handleRequests';
import { apiGet } from '../../utils/api';

const Cart: React.FC<CartProps> = ({
  items,
  cartItems,
  setCartItems,
  removeItem,
}) => {
  const [currentItems, setCurrentItems] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    setCurrentItems(() => Object.keys(cartItems).length);
  }, [cartItems]);

  const setRequestedItems = useCallback(
    async (requestedItems: Promise<CartItem>[]) => {
      const cartItems = await Promise.all(requestedItems);

      const getItemAsObject = (
        acc: Record<string, CartItem>,
        product: CartItem
      ) => {
        if (product) {
          return (acc[String(product.id)] = product), acc;
        }

        return acc;
      };

      const newCartItems = cartItems.reduce(getItemAsObject, {});

      setCartItems(cartItems => ({
        ...cartItems,
        ...newCartItems,
      }));
    },
    [items]
  );

  const getProducts = useCallback(() => {
    const cancelRequests: Function[] = [];

    if (items.length) {
      const requestedItems = [];

      const getCartItem = ({ data }: AxiosResponse) => {
        return {
          quantity: 1,
          ...data.product,
        };
      };

      for (const productId of items) {
        if (!(productId in cartItems)) {
          const { send, cancel } = apiGet(`/product/id?value=${productId}`);
          cancelRequests.push(cancel);

          const requestedItem = send()
            .then(getCartItem)
            .catch(handleRequest(setError));

          requestedItems.push(requestedItem);
        }
      }

      if (requestedItems.length) setRequestedItems(requestedItems);
    }

    return () => cancelRequests.forEach(cancel => cancel());
  }, [items]);

  const handleChangeQuantity = useCallback(
    (productId: string) => ({ target }: ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(target.value.slice(-2));
      if (value < 1 || isNaN(value)) return;

      // Values null and undefined blocked by condition
      if (cartItems[productId] != null) {
        setCartItems(prev => ({
          ...prev,
          [productId]: {
            ...prev[productId],
            quantity: value,
          },
        }));
      }
    },
    [cartItems]
  );

  const cartProducts = useCallback(
    ([productId, { description, ...rest }], index) => (
      <Product
        key={productId}
        type="cart"
        animation={{
          duration: '450ms',
          delay: `${0.3 * (index + 1)}s`,
          fill: 'forwards',
        }}
        {...rest}
      >
        <Input
          type="number"
          id={`cart-item-${productId}`}
          name="cartItem"
          label="Quantidade:"
          value={String(cartItems[productId].quantity)}
          onChange={handleChangeQuantity(productId)}
        />
        <PrimaryButton onClick={() => removeItem(productId)}>
          Retirar
        </PrimaryButton>
      </Product>
    ),
    [cartItems]
  );

  useEffect(getProducts, [items]);

  return (
    <Container title="Carrinho">
      {currentItems > 0 ? (
        <CartList className="list">
          {Object.entries(cartItems).map(cartProducts)}
        </CartList>
      ) : (
        <div className="warn">Vazio</div>
      )}
      {error && <span className="error">{error}</span>}
    </Container>
  );
};

export default Cart;
