import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

import Head from 'next/head';
import Header from '../../components/Header';
import ProductSection from '../../components/ProductSection';

import { apiGet } from '../../utils/api';
import ProductItem from '../../interfaces/product';

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    if (!params) throw 'Nenhum parâmetro fornecido';

    const product: ProductItem = await apiGet(`/product/id?value=${params.id}`)
      .then((res) => res.data.product)
      .catch(console.error);

    return {
      props: { product },
    };
  } catch (err) {
    throw err;
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const products: ProductItem[] = await apiGet('/product')
    .then((res) => res.data.products)
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
    <>
      <Head>
        <meta property="og:image" content={product.image} key="image" />
        <meta property="og:title" content={product.title} key="title" />
        <meta
          property="og:description"
          content={product.description}
          key="description"
        />

        <title>{product.title}</title>
      </Head>
      <Header />
      <ProductSection {...product} />
    </>
  );
};

export default ProductPage;
