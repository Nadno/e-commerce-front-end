import React, { useCallback, FormEvent } from 'react';
import Form from '../src/components/Form';

import Input from '../src/components/Input';
import FormData from '../src/HOC/form';

const SignIn = FormData(
  ({ data, handleChange }) => {
    const handleSubmit = useCallback((e: FormEvent) => {
      e.preventDefault();
    }, []);

    return (
      <Form onSubmit={handleSubmit}>
        <Form.Fieldset>
          <legend>Bem vindo!</legend>
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

          <Form.Submit>Entrar</Form.Submit>
        </Form.Fieldset>
      </Form>
    );
  },
  { email: '', password: '' }
);

export default SignIn;
