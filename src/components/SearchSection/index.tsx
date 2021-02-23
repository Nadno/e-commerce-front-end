import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react';

import Link from '../Link';
import { apiGet } from '../../utils/api';

import { Input } from '../Input';

import * as Search from './style';
import Container from '../Container';

interface Props {
  categories: string[];
  setProducts: Function;
}

const SearchSection: React.FC<Props> = ({ setProducts, categories }) => {
  const [productName, setProductName] = useState('');

  const searchChange = useCallback(
    (e: ChangeEvent) => {
      const { value } = e.target as HTMLInputElement;
      setProductName(value);
    },
    [productName]
  );

  const handleSearch = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      const products = await apiGet(`/product/name?value=${productName}`).then(
        ({ data }) => data.products || data.product
      );
      setProducts(() => products);
    },
    [productName]
  );

  return (
    <Search.Section>
      <Container title="Pesquise">
        <form className="search-bar" onSubmit={handleSearch}>
          <Input
            id="search"
            name="search"
            value={productName}
            onChange={searchChange}
          />
          <Search.Submit as="button" type="submit">
            Search
          </Search.Submit>
        </form>

        <ul className="categories">
          {categories.map((cat) => (
            <li key={cat}>
              <Link href={`/products/category/${cat}`}>{cat}</Link>
            </li>
          ))}
        </ul>
      </Container>
    </Search.Section>
  );
};

export default SearchSection;
