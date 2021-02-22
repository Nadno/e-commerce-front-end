import React, { useEffect, useState } from 'react';
import IProduct from '../../interfaces/product';
import Product from '../Product';
import StyledProductList from './style';

import { apiGet } from '../../utils/api';
import handleRequest from '../../utils/handleRequests';
interface Props {
  category?: number;
}

const ProductList: React.FC<Props> = ({ category }) => {
  const [products, setProducts] = useState<Array<IProduct>>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const url = (category || -1) >= 0
      ? `/product/category?value=${category}`
      : '/product';

    apiGet(url)
      .then(({ data }) => {
        setProducts(data.products);
      })
      .catch(handleRequest(setError));
  }, []);

  return (
    <StyledProductList>
      {products.length > 0 ? (
        <>
          <h2 className="title">Produtos</h2>
          <ul className="list">
            {products.length > 0 &&
              products.map((product) => (
                <Product {...product} key={product.id} />
              ))}
          </ul>
        </>
      ) : (
        <>
          <div className="nothing">Nada encontrado!</div>
          {error && <div className="error">{error}</div>}
        </>
      )}
    </StyledProductList>
  );
};

export default ProductList;
