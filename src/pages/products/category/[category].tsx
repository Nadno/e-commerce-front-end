import React, { useEffect, useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

import { apiGet } from '../../../src/utils/api';
import IProduct from '../../../src/interfaces/product';
import Home from '../../../src/screen/home';
import Head from 'next/head';

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params) throw 'Nenhum parâmetro fornecido';
  const { category } = params;

  const data: any = await apiGet(`/product/category?value=${category}`)
    .then(({ data }) => data)
    .catch(console.error);

  const categories: string[] = await apiGet('/product/categories')
    .then((res) => res.data.categories)
    .catch(console.error);

  return {
    props: {
      category: data || null,
      categories: categories || null,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const categories: string[] = await apiGet('/product/categories')
    .then(({ data }) => data.categories)
    .catch(console.error);

  const paths = categories.map((category) => ({
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
