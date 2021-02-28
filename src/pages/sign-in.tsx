import React, { useCallback, FormEvent, useState } from 'react';
import Form from '../components/Form';

import Input from '../components/Input';
import FormData, { WrappedComponent } from '../HOC/form';
import useAccount from '../hooks/useAccount';
import handleRequest from '../utils/handleRequests';
import { apiPost } from '../utils/api';

const INITIAL_DATA = { email: '', password: '' };
type SignInData = typeof INITIAL_DATA;

const SignIn: WrappedComponent<SignInData> = ({ data, handleChange }) => {
  const [error, setError] = useState('');
  const { login } = useAccount();

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      apiPost('/user/sign-in', {
        ...data,
      })
        .then(({ data }) => {
          login(data);
        })
        .catch(handleRequest(setError));
    },
    [data]
  );

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
};

export default FormData<{}, SignInData>(SignIn, INITIAL_DATA);
