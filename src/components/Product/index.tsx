import React from 'react';
import formatCurrency from '../../utils/formatCurrency';
import formatDescription from '../../utils/formatDescription';
import ListItem from './style';

import ProductItem from '../../interfaces/product';

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
    <ListItem title={title}>
      <img src={image} alt={title} className="img" />

      <div className={`content ${type}`}>
        <div className="info">
          <h3 className="title">{title}</h3>
          <p className="description" title={description}>
            {formatDescription(description)}
          </p>
          <span className="price">{formatCurrency(price)}</span>
        </div>

        <div className="buttons">
          {children}
        </div>
      </div>
    </ListItem>
  );
};

export default Product;
