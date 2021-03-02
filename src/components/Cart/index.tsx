import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';

import Product from '../Product';
import Container from '../Container/';

import { apiGet } from '../../utils/api';
import handleRequest from '../../utils/handleRequests';

import { Section, ProductCount } from './style';
import Button from '../Button';

const Cart: React.FC<CartProps> = ({
  items,
  products,
  setItems,
  removeItem,
}) => {
  const [totalItems, setTotalItems] = useState(0);
  const [currentItems, setCurrentItems] = useState(0);

  const [error, setError] = useState('');

  useEffect(() => {
    setCurrentItems(() => Object.keys(products).length);
  }, [products]);

  const getProducts = useCallback(() => {
    setItems({});
    items.forEach(id => {
      apiGet(`/product/id?value=${id}`)
        .then(({ data }) => {
          const productId = String(data.product.id);

          setItems(products => ({
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

  const handleChangeQuantity = useCallback(
    (productId: string) => ({ target }: ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(target.value.slice(-2));
      if (value < 1 || isNaN(value)) return;

      // Values null and undefined blocked by condition
      if (products[productId] != null) {
        setItems(prev => ({
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
        {currentItems > 0 ? (
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
        ) : (
          <div className="warn">Vazio</div>
        )}
        {error && <span className="error">{error}</span>}
      </Container>
    </Section>
  );
};

export default Cart;
