import React from 'react';
import IProduct from '../../interfaces/product';
import formatCurrency from '../../utils/formatCurrency';
import formatDescription from '../../utils/formatDescription';
import Button from '../Button';
import StyledProduct from './style';

const Product: React.FC<IProduct> = ({
  description,
  id,
  image,
  price,
  title,
}) => {
  return (
    <StyledProduct as="li" title={title}>
      <img src={image} alt={title} className="img" />

      <StyledProduct.Content>
        <div className="info">
          <h3 className="title">{title}</h3>
          <p className="description" title={description}>{formatDescription(description)}</p>
          <span className="price">{formatCurrency(price)}</span>
        </div>

        <Button.Link href={`/products/${id}`}>Detalhes</Button.Link>
      </StyledProduct.Content>
    </StyledProduct>
  );
};

export default Product;
