import React, { useCallback, useEffect, useState } from 'react';

import Container from '../Container/';
import Product from '../Product';

import { apiGet } from '../../utils/api';
import handleRequest from '../../utils/handleRequests';
import ProductItem from '../../interfaces/product';

import Section from './style';

interface Props {
  items: string[];
}

const Cart: React.FC<Props> = ({ items }) => {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [error, setError] = useState('');
  const TOTAL_ITEMS = items.length;
  
  const getProducts = useCallback(() => {
    setProducts(() => []);
    items.forEach((id) => {
      apiGet(`/product/id?value=${id}`)
        .then(({ data }) => {
          setProducts((products) => [...products, data.product]);
        })
        .catch(handleRequest(setError));
    });
  }, [items]);

  useEffect(getProducts, []);
  console.log(products);
  return (
    <Section>
      <Container title="Carrinho">
      {products.length === TOTAL_ITEMS &&
        products.map((prod) => (
          <Product key={prod.id} type="cart" {...prod} />
        ))}
      </Container>
    </Section>
  );
};

export default Cart;
