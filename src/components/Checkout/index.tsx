import React, { useCallback } from 'react';
import FormData, { WrappedComponent } from '../../HOC/form';

import { Fieldset, PrimarySubmit } from '../Form';
import { Input } from '../Input';
import Select from '../Select';
import OrderTable from '../OrderTable';
import { Section, CheckoutForm } from './style';

import useAccount from '../../hooks/useAccount';
import { apiPost } from '../../utils/api';
import handleRequest from '../../utils/handleRequests';
import validate from '../../utils/validation/validate';
import { CartProps } from '../Cart';

const INITIAL_DATA = {
  cardNumber: '',
  cardType: 'VS',
  cardOwner: '',
  cardValidate: '',
  cardSecurityCode: '',
};
type CheckoutData = typeof INITIAL_DATA;

interface Props extends Pick<CartProps, 'products'> {
  finalPrice: number;
}

const Checkout: WrappedComponent<CheckoutData, Props> = ({
  data,
  inputError,
  invalid,
  handleChange,
  finalPrice,
  products,
}) => {
  const { account } = useAccount();

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();

      const formattedProducts = Object.entries(products).map(
        ([, product]) => product
      );

      const { response } = apiPost('/order/create', {
        id: account.id,
        products: formattedProducts,
      });

      response.then(console.log).catch(handleRequest(console.log));
    },
    [data, products]
  );

  return (
    <Section className="section-container">
      <OrderTable products={Object.entries(products)} finalPrice={finalPrice} />

      <CheckoutForm onSubmit={handleSubmit}>
        <h2 className="title">Cartão</h2>
        <Fieldset>
          <div className="input-block">
            <Input
              id="card-number"
              name="cardNumber"
              error={inputError.cardNumber}
              value={data.cardNumber}
              label="Número do cartão"
              placeholder="Apenas números"
              onChange={handleChange}
            />
            <Select
              id="card-type"
              name="cardType"
              value={data.cardType}
              error={inputError.cardType}
              label="Cartão"
              onChange={handleChange}
              options={[
                { value: 'Visa', abbr: 'VS' },
                { value: 'Mastercard', abbr: 'MS' },
              ]}
            />
          </div>

          <Input
            id="card-owner"
            name="cardOwner"
            value={data.cardOwner}
            error={inputError.cardOwner}
            label="Nome"
            placeholder="Nome, presente no cartão"
            onChange={handleChange}
          />

          <Input
            type="month"
            id="card-validate"
            name="cardValidate"
            value={data.cardValidate}
            error={inputError.cardValidate}
            label="Validade"
            placeholder="MM/AA"
            onChange={handleChange}
          />
          <Input
            id="card-security-code"
            name="cardSecurityCode"
            value={data.cardSecurityCode}
            error={inputError.cardSecurityCode}
            label="Código de segurança"
            placeholder="123"
            onChange={handleChange}
          />
          <PrimarySubmit disabled={invalid}>Comprar</PrimarySubmit>
        </Fieldset>
      </CheckoutForm>
    </Section>
  );
};

export default FormData(Checkout, INITIAL_DATA, validate['credit-card']);
