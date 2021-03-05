import React, { useEffect, useState } from 'react';

import Container from '../Container';
import IProduct from '../../types/product';
import Product from '../Product';
import Section from './style';
import Button from '../Button';

interface Props {
  error?: string;
  products: IProduct[];
}

const ProductList: React.FC<Props> = ({ error, products }) => {
  const [message, setMessage] = useState('Buscando itens');

  useEffect(() => {
    if (error || !products.length) {
      setMessage('Nada encontrado');
    }
  }, [error, products]);

  return (
    <Section>
      <Container title="Produtos">
        {products.length > 0 ? (
          <ul className="list">
            {products.length > 0 &&
              products.map(product => (
                <Product {...product} key={product.id}>
                  <Button.Link href={`/products/${product.id}`}>
                    Detalhes
                  </Button.Link>
                </Product>
              ))}
          </ul>
        ) : (
          <div className="warn">{message}</div>
        )}
        {error && <div className="error">{error}</div>}
      </Container>
    </Section>
  );
};

export default ProductList;
