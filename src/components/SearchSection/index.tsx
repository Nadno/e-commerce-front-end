import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useState,
} from 'react';

import Link from 'next/link';
import { apiGet } from '../../utils/api';

import { StyledInput } from '../Input';

import * as Search from './style';

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
      setProducts(products);
    },
    [productName]
  );

  return (
    <Search.Section>
      <form className="search-bar" onSubmit={handleSearch}>
        <StyledInput
          id="search"
          name="search"
          value={productName}
          onChange={searchChange}
        />
        <Search.Submit
          as="button"
          type="submit"
        >
          Search
        </Search.Submit>
      </form>
    </Search.Section>
  );
};

export default SearchSection;
