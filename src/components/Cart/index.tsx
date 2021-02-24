import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';

import Product from '../Product';
import Container from '../Container/';

import { apiGet } from '../../utils/api';
import handleRequest from '../../utils/handleRequests';
import { CartItem } from '../../interfaces/product';

import { Section, ProductCount, FinalizeOrder } from './style';

interface Props {
  items: string[];
}

const Cart: React.FC<Props> = ({ items }) => {
  const TOTAL_ITEMS = items.length;
  
  const [products, setProducts] = useState<{ [prod: string]: CartItem }>({});
  const [error, setError] = useState('');
  const [total, setTotal] = useState(0);

  const currentItems = Object.keys(products).length;

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

    setTotal(total);
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

  useEffect(getProducts, []);

  useEffect(() => {
    if (currentItems === TOTAL_ITEMS) {
      getTotalPrice();
    }
  }, [products]);

  return (
    <Section>
      <Container title="Carrinho" backTo="/">
        <ul className="list">
          {currentItems === TOTAL_ITEMS &&
            Object.entries(products).map(
              ([productId, { description, ...rest }]) => (
                <Product key={productId} type="cart" {...rest}>
                  <button className="delete">Deletar</button>
                  <ProductCount
                    value={products[productId].quantity}
                    onChange={handleChangeQuantity(productId)}
                  />
                </Product>
              )
            )}
        </ul>
      </Container>

      <FinalizeOrder>
        {currentItems === TOTAL_ITEMS && total}
      </FinalizeOrder>
    </Section>
  );
};

export default Cart;
