import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

import Head from 'next/head';
import Header from '../../components/Header';
import ProductSection from '../../components/ProductSection';

import { apiGet } from '../../utils/api';
import ProductItem from '../../types/product';
import { GridContainer } from '../../components/Container/style';
import CommentSection from '../../components/Comment';

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    if (!params) throw 'Nenhum parâmetro fornecido';
    let product: ProductItem;

    product = await apiGet(`/product/id?value=${params.id}`)
      .send()
      .then(res => res.data.product)
      .catch(console.error);

    return {
      props: { product },
    };
  } catch (err) {
    throw err;
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  let products: ProductItem[];

  products = await apiGet('/product')
    .send()
    .then(({ data }) => data.products)
    .catch(console.error);

  const paths = products.map(({ id }) => ({
    params: {
      id: String(id),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

const ProductPage: React.FC<{ product: ProductItem }> = ({ product }) => {
  return (
    <GridContainer>
      <Head>
        <meta property="og:site_name" content="Loja" key="site_name" />
        <meta property="og:title" content={product.title} key="title" />
        <meta property="og:image" content={product.image} key="image" />
        <meta
          property="og:description"
          content={product.description}
          key="description"
        />

        <title>{product.title}</title>
      </Head>
      <Header />
      <ProductSection {...product} />
      <CommentSection productId={product.id} />
    </GridContainer>
  );
};

export default ProductPage;
