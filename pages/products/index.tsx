import { GetStaticProps } from 'next';
import React, { useEffect, useState } from 'react';

import ProductItem from '../../src/interfaces/product';
import Home from '../../src/screen/home';

import { apiGet } from '../../src/utils/api';
import handleRequest from '../../src/utils/handleRequests';

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
    <Home
      error={error}
      categories={categories}
      products={products}
      setProducts={setProducts}
    />
  );
};

export default IndexPage;
