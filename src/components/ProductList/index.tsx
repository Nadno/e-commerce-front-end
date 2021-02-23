import React from 'react';
import IProduct from '../../interfaces/product';
import Product from '../Product';
import StyledProductList from './style';
interface Props {
  error?: string;
  products: IProduct[];
}

const ProductList: React.FC<Props> = ({ error, products }) => {
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
