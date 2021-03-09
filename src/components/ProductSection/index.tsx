import React, { useCallback } from 'react';
import styled from 'styled-components';
import router from 'next/router';

import Container from '../Container/style';
import { ProductContent } from '../Product/style';
import Button from '../Button';

import formatCurrency from '../../utils/formatCurrency';
import ProductItem from '../../types/product';
import useCart from '../../hooks/useCart';
import useModal from '../../hooks/useModal';

const Section = styled(Container)`
  margin: 8rem 1rem;
  display: grid;
  grid-template-rows: auto;
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

  .cart {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    row-gap: 2rem;
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
}) => {
  const { addToCart } = useCart();
  const [createModal, openModal] = useModal();

  const handleAddToCart = useCallback(() => {
    const toCart = () => router.push('/cart');

    if (addToCart(String(id))) {
      createModal.Action({
        message: 'O item foi adicionado ao carrinho.',
        okButtonText: 'Carrinho',
        cancelButtonText: 'Continuar',
        okAction: toCart,
      });
    } else {
      createModal.Warn({
        message:
          'Erro ao adicionar o item ao carrinho, verifique se o item já não se encontra presente no carrinho.',
      });
    }

    openModal();
  }, []);

  return (
    <Section as="section">
      <Button.Back />

      <div className="img-container">
        <img src={image} alt={title} />
      </div>

      <ProductContent>
        <h1 className="title">{title}</h1>

        <p className="description">{description}</p>

        <div className="cart">
          <span className="price">{formatCurrency(price)}</span>
          <Button.Primary onClick={handleAddToCart}>
            Adicionar ao carrinho
          </Button.Primary>
        </div>
      </ProductContent>
    </Section>
  );
};

export default ProductSection;
