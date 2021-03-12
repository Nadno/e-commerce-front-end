import React, { useCallback, FormEvent, useState } from 'react';
import { Form, Fieldset, Submit } from '../components/Form';

import { Input } from '../components/Input';
import FormData, { FormComponent } from '../HOC/form';
import useAccount from '../hooks/useAccount';
import handleRequest from '../utils/handleRequests';
import { apiPost } from '../utils/api';
import validate from '../utils/validation/validate';
import useModal from '../hooks/useModal';

const INITIAL_DATA = { email: '', password: '' };
type SignInData = typeof INITIAL_DATA;

const SignIn: FormComponent<SignInData> = ({
  data,
  invalid,
  inputError,
  handleChange,
}) => {
  const [createModal, openModal] = useModal();
  const { login } = useAccount();

  const unsuccessSign = useCallback(message => {
    createModal.warn({ message });
    openModal();
  }, []);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (invalid) return unsuccessSign('Todos campos precisão estar válidos!');

      apiPost('/user/sign-in', { ...data })
        .then(login)
        .catch(handleRequest(unsuccessSign));
    },
    [data, invalid]
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Fieldset>
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
        <Submit>Entrar</Submit>
      </Fieldset>
    </Form>
  );
};

export default FormData(SignIn, INITIAL_DATA, validate['sign-in']);
