import React from 'react';
import styled from 'styled-components';

import formatCurrency from '../../utils/formatCurrency';
import Button from '../Button';
import Container from '../Container';

import { FullProduct } from '../../interfaces/product';
import StyledProduct from '../Product/style';

const StyledProductSection = styled(Container)`
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

const ProductSection: React.FC<FullProduct> = ({
  description,
  id,
  image,
  price,
  title,
  details,
}) => {
  return (
    <StyledProductSection>
      <Button.Back />
      <div className="img-container">
        <img src={image} alt={title} />
      </div>

      <StyledProduct.Content className="about">
        <h1 className="title">{title}</h1>

        <p className="description">{description}</p>

        <div className="cart">
          <span className="price">{formatCurrency(price)}</span>
          <Button.Primary>Adicionar ao carrinho</Button.Primary>
        </div>
      </StyledProduct.Content>
    </StyledProductSection>
  );
};

export default ProductSection;
