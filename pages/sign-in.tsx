import React, { useCallback, FormEvent, useState } from 'react';
import Form from '../src/components/Form';

import Input from '../src/components/Input';
import FormData from '../src/HOC/form';
import useAccount from '../src/useAccount';
import handleRequest from '../src/utils/handleRequests';
import { apiPost } from '../src/utils/api';

const SignIn = FormData(
  ({ data, handleChange }) => {
    const [error, setError] = useState('');
    const { login } = useAccount();

    const handleSubmit = useCallback((e: FormEvent) => {
      e.preventDefault();

      apiPost('/user/sign-in', {
        ...data,
      })
        .then(({ data }) => {
          login(data);
        })
        .catch(handleRequest(setError));
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
        {error && <span className="error">{error}</span>}
      </Form>
    );
  },
  { email: '', password: '' }
);

export default SignIn;
