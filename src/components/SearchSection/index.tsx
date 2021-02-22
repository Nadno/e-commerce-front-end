import React, {
  ChangeEvent,
  useCallback,
  useRef,
  useState,
} from 'react';

import Link from 'next/link';
import { apiGet } from '../../utils/api';

import { StyledInput } from '../Input';

import * as Style from './style';

interface Props {
  categories: string[];
  setProducts: Function;
}

const SearchSection: React.FC<Props> = ({ setProducts, categories }) => {
  const [productName, setProductName] = useState('');
  const searchBar = useRef<HTMLInputElement>(null);

  const searchChange = useCallback(
    (e: ChangeEvent) => {
      const { value } = e.target as HTMLInputElement;
      setProductName(value);
    },
    [productName]
  );

  const handleSearch = useCallback(async () => {
    if (searchBar.current) {
      const input = searchBar.current;
      const products = await apiGet(`/product/name?value=${input.value}`).then(
        ({ data }) => data.products || data.product
      );
      setProducts(products);
    }
  }, [productName]);

  return (
    <Style.Section>
      <div className="search-bar">
        <StyledInput
          id="search"
          name="search"
          value={productName}
          onChange={searchChange}
          ref={searchBar}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
    </Style.Section>
  );
};

export default SearchSection;
