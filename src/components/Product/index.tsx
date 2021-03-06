import React from 'react';
import formatCurrency from '../../utils/formatCurrency';
import formatDescription from '../../utils/formatDescription';
import ListItem, { ProductContent } from './style';

import ProductItem from '../../types/product';
import Animation from '../../types/animation';

interface Props extends ProductItem {
  type?: 'normal' | 'cart';
  animation: Animation;
}

const Product: React.FC<Props> = ({
  description,
  image,
  price,
  title,
  type = 'normal',
  animation,
  children,
}) => {
  return (
    <ListItem {...animation} title={title} className={type}>
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
