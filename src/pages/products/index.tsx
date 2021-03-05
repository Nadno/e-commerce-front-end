import { GetStaticProps } from 'next';
import Head from 'next/head';
import React, { useCallback, useEffect, useState } from 'react';

import ProductItem from '../../types/product';
import Home from '../../screen/home';

import { apiGet } from '../../utils/api';
import handleRequest from '../../utils/handleRequests';

export const getStaticProps: GetStaticProps = async () => {
  let categories: string[] = [];

  await apiGet('/product/categories')
    .response.then(res => {
      categories = res.data.categories;
    })
    .catch(() => {});

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
    const { response, cancelRequest } = apiGet('/product');

    response
      .then(({ data }) => {
        if (data.products) setProducts(data.products);
      })
      .catch(handleRequest(setError));

    return cancelRequest;
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
