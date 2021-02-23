import React from 'react';
import styled from 'styled-components';

import Container from '../Container/style';
import Product from '../Product/style';
import Button from '../Button';

import formatCurrency from '../../utils/formatCurrency';
import ProductItem from '../../interfaces/product';

const Section = styled(Container)`
  margin: 8rem 1rem;
  display: grid;
  grid-template-rows: auto;
  align-items: center;
  justify-content: center;

  gap: 2rem;

  .img-container {
    margin: 4rem 0;
    display: flex;
    justify-content: center;

    img {
      width: 100%;
      max-width: 40rem;
      height: 100%;
    }
  }

  .cart {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    row-gap: 2rem;
  }

  .about {
    padding: 0 2rem;
  }

  @media screen and (min-width: 450px) {
    .cart {
      flex-direction: row;
      align-items: center;
    }

    .price {
      padding: 0 2rem;
    }
  }
`;

const ProductSection: React.FC<ProductItem> = ({
  description,
  id,
  image,
  price,
  title,
}) => {
  return (
    <Section as="section">
      <Button.Back />
      <div className="img-container">
        <img src={image} alt={title} />
      </div>

      <Product.Content className="about">
        <h1 className="title">{title}</h1>

        <p className="description">{description}</p>

        <div className="cart">
          <span className="price">{formatCurrency(price)}</span>
          <Button.Primary>Adicionar ao carrinho</Button.Primary>
        </div>
      </Product.Content>
    </Section>
  );
};

export default ProductSection;
