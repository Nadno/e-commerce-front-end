import React, { useEffect, useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

import { apiGet } from '../../../utils/api';
import IProduct from '../../../types/product';
import Home from '../../../screen/home';
import Head from 'next/head';

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params) throw 'Nenhum parâmetro fornecido';

  const data: any = await apiGet(`/product/category?value=${params.category}`)
    .send()
    .then(({ data }) => data)
    .catch(() => []);

  const categories: string[] = await apiGet('/product/categories')
    .send()
    .then(res => res.data.categories)
    .catch(() => []);

  return {
    props: {
      category: data || null,
      categories: categories || null,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const categories: string[] = await apiGet('/product/categories')
    .send()
    .then(({ data }) => data.categories)
    .catch(() => []);

  const paths = categories.map(category => ({
    params: {
      category,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

const CategoryPage: React.FC<{ category: any; categories: string[] }> = ({
  category,
  categories,
}) => {
  const [products, setProducts] = useState<Array<IProduct>>(category.products);

  useEffect(() => {
    setProducts(category.products);
  }, [category.products]);

  return (
    <>
      <Head>
        <meta property="og:title" content={category.name} key="title" />
        <meta
          property="og:description"
          content={category.description}
          key="description"
        />

        <title>{category.name}</title>
      </Head>
      <Home
        categories={categories}
        products={products}
        setProducts={setProducts}
      />
    </>
  );
};

export default CategoryPage;
