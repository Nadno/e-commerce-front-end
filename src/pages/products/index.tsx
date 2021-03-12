import React, { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import { GetStaticProps } from 'next';

import ProductItem from '../../types/product';
import Home from '../../screen/home';

import { apiGet } from '../../utils/api';
import handleRequest from '../../utils/handleRequests';

export const getStaticProps: GetStaticProps = async () => {
  let categories: string[] = [];

  categories = await apiGet('/product/categories')
    .send()
    .then(res => res.data.categories)
    .catch(() => []);

  return {
    props: {
      categories,
    },
  };
};

interface Props {
  categories: string[];
}

const IndexPage: React.FC<Props> = ({ categories }) => {
  const [products, setProducts] = useState<Array<ProductItem>>([]);
  const [error, setError] = useState('');

  const getProducts = useCallback(() => {
    const { cancel, send } = apiGet('/product');

    send()
      .then(({ data }) => setProducts(data.products))
      .catch(handleRequest(setError));

    return cancel;
  }, []);

  useEffect(getProducts, []);

  return (
    <>
      <Head>
        <title>Produtos</title>
      </Head>
      <Home
        error={error}
        categories={categories}
        products={products}
        setProducts={setProducts}
      />
    </>
  );
};

export default IndexPage;
