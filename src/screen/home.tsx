import React from 'react';

import Header from '../components/Header';
import ProductList from '../components/ProductList';
import SearchSection from '../components/SearchSection';
import IProduct from '../interfaces/product';

interface Props {
  error: string;
  categories: string[];
  products: IProduct[];
  setProducts: Function;
}

const Home: React.FC<Props> = ({
  error,
  categories,
  products,
  setProducts,
}) => (
  <>
    <Header />
    <SearchSection categories={categories} setProducts={setProducts} />
    <ProductList error={error} products={products} />
  </>
);

export default Home;
