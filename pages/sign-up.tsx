import React, { useCallback, FormEvent } from 'react';
import Form from '../src/components/Form';

import Input from '../src/components/Input';
import FormData from '../src/HOC/form';

const SignUp = FormData(
  ({ data, handleChange }) => {
    const handleSubmit = useCallback((e: FormEvent) => {
      e.preventDefault();
    }, []);

    return (
      <Form onSubmit={handleSubmit}>
        <Form.Fieldset>
          <legend>E-mail e Senha</legend>
          <Input
            id="email"
            name="email"
            value={data.email}
            label="Email"
            placeholder="Digite seu e-mail"
            handleChange={handleChange}
          />

          <Input
            type="password"
            id="password"
            name="password"
            value={data.password}
            label="Senha"
            placeholder="Digite sua senha"
            handleChange={handleChange}
          />
        </Form.Fieldset>

        <Form.Fieldset>
          <legend>Endereço</legend>
          <Input
            id="zip-code"
            name="zipCode"
            value={data.zipCode}
            label="CEP"
            placeholder="CEP"
            handleChange={handleChange}
          />

          <Input
            id="address"
            name="address"
            value={data.address}
            label="Endereço"
            placeholder="Ex.: Rua 14, Quadra 10, Casa 5"
            handleChange={handleChange}
          />
        <Form.Submit>Cadastrar-se</Form.Submit>
        </Form.Fieldset>
      </Form>
    );
  },
  { email: '', password: '', zipCode: '', address: '', }
);

export default SignUp;
