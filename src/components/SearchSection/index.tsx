import React, {
  ChangeEvent,
  FormEvent,
  memo,
  useCallback,
  useState,
} from 'react';

import Link from '../Link';
import Container from '../Container';
import { apiGet } from '../../utils/api';

import { Input } from '../Input/style';
import * as Search from './style';
import Form from '../Form';

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

      const { response } = apiGet(`/product/name?value=${productName}`);
      const products = await response.then(
        ({ data }) => data.products || data.product
      );

      setProducts(() => products);
    },
    [productName]
  );

  return (
    <Search.Section>
      <Container title="Pesquisar">
        <form className="search-bar" onSubmit={handleSearch}>
          <Input
            type="search"
            id="search"
            name="search"
            value={productName}
            onChange={searchChange}
          />
          <Form.SubmitSecondary>Buscar</Form.SubmitSecondary>
        </form>

        <ul className="categories">
          {categories.length > 0 &&
            categories.map(cat => (
              <li key={cat}>
                <Link href={`/products/category/${cat}`}>{cat}</Link>
              </li>
            ))}
        </ul>
      </Container>
    </Search.Section>
  );
};

export default memo(SearchSection);
