import React from 'react';
import formatCurrency from '../../utils/formatCurrency';
import formatDescription from '../../utils/formatDescription';
import ListItem, { ProductContent } from './style';

import ProductItem from '../../types/product';

interface Props extends ProductItem {
  type?: 'normal' | 'cart';
}

const Product: React.FC<Props> = ({
  description,
  id,
  image,
  price,
  title,
  type = 'normal',
  children,
}) => {
  return (
    <ListItem title={title} className={type}>
      <img src={image} alt={title} className="img" />

      <ProductContent>
        <div className="info">
          <h3 className="title">{title}</h3>
          {description && (
            <p className="description" title={description}>
              {formatDescription(description)}
            </p>
          )}
          <span className="price">{formatCurrency(price)}</span>
        </div>

        <div className="buttons">{children}</div>
      </ProductContent>
    </ListItem>
  );
};

export default Product;
