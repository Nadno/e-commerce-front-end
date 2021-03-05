import React, { useCallback, FormEvent, useState } from 'react';
import Form from '../components/Form';

import Input from '../components/Input';
import FormData, { WrappedComponent } from '../HOC/form';
import useAccount from '../hooks/useAccount';
import handleRequest from '../utils/handleRequests';
import { apiPost } from '../utils/api';
import validate from '../utils/validate';

const INITIAL_DATA = { email: '', password: '' };
type SignInData = typeof INITIAL_DATA;

const SignIn: WrappedComponent<SignInData> = ({
  data,
  invalid,
  inputError,
  handleChange,
}) => {
  const [error, setError] = useState('');
  const { login } = useAccount();

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (invalid) return;

      const goToPath = '/';

      const { response } = apiPost('/user/sign-in', {
        ...data,
      });
      
      response
        .then(({ data }) => {
          login(data, goToPath);
        })
        .catch(handleRequest(setError));
    },
    [data, invalid]
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Fieldset>
        <legend>Bem vindo!</legend>

        <Input
          id="email"
          name="email"
          value={data.email}
          error={inputError.email}
          label="Email"
          placeholder="Digite seu e-mail"
          onChange={handleChange}
        />

        <Input
          type="password"
          id="password"
          name="password"
          value={data.password}
          error={inputError.password}
          label="Senha"
          placeholder="Digite sua senha"
          onChange={handleChange}
        />
        {error && <span className="error">{error}</span>}
        <Form.Submit disabled={invalid}>Entrar</Form.Submit>
      </Form.Fieldset>
    </Form>
  );
};

export default FormData(SignIn, INITIAL_DATA, validate['sign-in']);
