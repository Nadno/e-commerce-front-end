import { GetStaticProps } from 'next';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';

import ProductItem from '../../interfaces/product';
import Home from '../../screen/home';

import { apiGet } from '../../utils/api';
import handleRequest from '../../utils/handleRequests';

export const getStaticProps: GetStaticProps = async () => {
  const categories: any[] = await apiGet('/product/categories')
    .then((res) => res.data.categories)
    .catch(console.error);

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

  useEffect(() => {
    apiGet('/product')
      .then(({ data }) => {
        setProducts(data.products);
      })
      .catch(handleRequest(setError));
  }, []);

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
