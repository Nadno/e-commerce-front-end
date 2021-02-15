import React, { useEffect, useState } from 'react';
import IProduct from '../../interfaces/product';
import Product from '../Product';
import StyledProductList from './style';

interface Props {
  category?: string;
}

const ProductList: React.FC<Props> = ({ category }) => {
  const [products, setProducts] = useState<Array<IProduct>>([]);

  useEffect(() => {
    const URL = 'http://localhost:3000/api/db';

    fetch(URL)
      .then((res) => res.json())
      .then(items => {
        console.log(items);
        setProducts(items)
      });
  }, []);

  return (
    <StyledProductList>
      <h2 className="title">Produtos</h2>
      <ul className="list">
        {products.length > 0 &&
          products.map((product) => 
            <Product {...product} key={product.id} />
          )}
      </ul>
    </StyledProductList>
  );
};

export default ProductList;
