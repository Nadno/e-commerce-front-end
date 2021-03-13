import React, { useCallback } from 'react';
import styled from 'styled-components';
import router from 'next/router';

import Star from '../Star';
import { ButtonBack } from '../Button';
import { PrimaryButton } from '../Button/style';
import { ProductContent } from '../Product/style';
import Container, { FlexContainer } from '../Container/style';

import formatCurrency from '../../utils/formatCurrency';
import ProductItem from '../../types/product';
import useCart from '../../hooks/useCart';
import useModal from '../../hooks/useModal';

const Section = styled(Container)`
  margin: 8rem 1rem;
  display: grid;
  grid-template: auto / 1fr;
  align-items: center;
  justify-content: center;

  gap: 1rem;

  .title {
    font-size: 2.8rem;
    margin-bottom: 0.5rem;
  }

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

  @media screen and (min-width: 450px) {
    .cart {
      flex-direction: row;
      align-items: center;

      button {
        width: initial;
      }
    }
  }
`;

const ProductSection: React.FC<ProductItem> = ({
  description,
  id,
  image,
  price,
  title,
  rating,
}) => {
  const { addToCart } = useCart();
  const [createModal, openModal] = useModal();

  const handleAddToCart = useCallback(() => {
    const toCart = () => router.push('/cart');

    if (addToCart(String(id))) {
      createModal.action({
        message: 'O item foi adicionado ao carrinho.',
        okButtonText: 'Carrinho',
        cancelButtonText: 'Continuar',
        okAction: toCart,
      });
    } else {
      createModal.warn({
        message:
          'Erro ao adicionar o item ao carrinho, verifique se o item já não se encontra presente no carrinho.',
      });
    }

    openModal();
  }, []);

  return (
    <Section as="section">
      <ButtonBack />

      <div className="img-container">
        <img src={image} alt={title} />
      </div>

      <ProductContent>
        <div className="product">
          <h1 className="title">{title}</h1>
          <Star rating={rating} />
        </div>

        <p className="description">{description}</p>

        <FlexContainer className="cart">
          <span className="price">{formatCurrency(price)}</span>
          <PrimaryButton onClick={handleAddToCart}>
            Adicionar ao carrinho
          </PrimaryButton>
        </FlexContainer>
      </ProductContent>
    </Section>
  );
};

export default ProductSection;
