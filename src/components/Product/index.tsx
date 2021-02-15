import React from 'react';
import IProduct from '../../interfaces/product';
import formatCurrency from '../../utils/formatCurrency';
import Link from '../Link';
import StyledProduct from './style';

const Product: React.FC<IProduct> = ({
  description,
  id,
  image,
  price,
  title,
}) => {
  return (
    <StyledProduct>
      <img src={image} alt={title} className="img" />

      <div className="info">
        <h3 className="title">{title}</h3>
        <span className="price">{formatCurrency(price)}</span>
        <div className="more">
          <Link href="#">
            Comprar
          </Link>
        </div>
      </div>
    </StyledProduct>
  );
};

export default Product;
