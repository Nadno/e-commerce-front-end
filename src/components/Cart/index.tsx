import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';

import Product from '../Product';
import Container from '../Container/';

import { apiGet } from '../../utils/api';
import handleRequest from '../../utils/handleRequests';
import { CartItem } from '../../interfaces/product';

import { Section, ProductCount, FinalizeOrder } from './style';
import Button from '../Button';

interface Props {
  items: string[];
  removeItem(e: string): void;
}

const Cart: React.FC<Props> = ({ items, removeItem }) => {
  const [totalItems, setTotalItems] = useState(0);
  const [currentItems, setCurrentItems] = useState(0);

  const [products, setProducts] = useState<{ [prod: string]: CartItem }>({});
  const [error, setError] = useState('');
  const [finalPrice, setFinalPrice] = useState(0);

  useEffect(() => {
    setCurrentItems(() => Object.keys(products).length);
    getTotalPrice();
  }, [products]);

  const getProducts = useCallback(() => {
    setProducts({});
    items.forEach((id) => {
      apiGet(`/product/id?value=${id}`)
        .then(({ data }) => {
          const productId = String(data.product.id);

          setProducts((products) => ({
            ...products,

            [productId]: {
              quantity: 1,
              ...data.product,
            },
          }));
        })
        .catch(handleRequest(setError));
    });
  }, [items]);

  const getTotalPrice = useCallback(() => {
    const total = Object.entries(products).reduce(
      (acc, [, { quantity, price }]) => (acc += price * quantity),
      0
    );

    setFinalPrice(total);
  }, [products]);

  const handleChangeQuantity = useCallback(
    (productId: string) => ({ target }: ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(target.value.slice(-2));
      if (value < 1 || isNaN(value)) return;

      if (typeof products[productId] !== 'undefined') {
        setProducts((prev) => ({
          ...prev,
          [productId]: {
            ...prev[productId],
            quantity: value,
          },
        }));
      }
    },
    [products]
  );

  useEffect(() => {
    getProducts();
    setTotalItems(() => items.length);
  }, [items]);

  return (
    <Section>
      <Container title="Carrinho" backTo="/">
        <ul className="list">
          {currentItems === totalItems &&
            Object.entries(products).map(
              ([productId, { description, ...rest }]) => (
                <Product key={productId} type="cart" {...rest}>
                  <ProductCount
                    value={products[productId].quantity}
                    onChange={handleChangeQuantity(productId)}
                  />
                  <Button.Primary
                    onClick={() => removeItem(productId)}
                    className="delete"
                  >
                    Retirar
                  </Button.Primary>
                </Product>
              )
            )}
        </ul>

        <FinalizeOrder>
          Preço Total:{' '}
          <span className="total">
            {currentItems === totalItems && finalPrice}
          </span>
          <Button.Secondary>Comprar</Button.Secondary>
        </FinalizeOrder>
      </Container>
    </Section>
  );
};

export default Cart;
