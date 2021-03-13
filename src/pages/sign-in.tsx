import React, { useCallback, FormEvent } from 'react';
import Link from 'next/link';

import Form from '../components/Form';
import { Input } from '../components/Input';
import { Submit } from '../components/Button';
import { Fieldset } from '../components/Form/style';
import FormData, { FormComponent } from '../HOC/form';
import { GridContainer } from '../components/Container/style';

import useAccount from '../hooks/useAccount';
import { apiPost } from '../utils/api';
import handleRequest from '../utils/handleRequests';
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
    <GridContainer>
      <Form onSubmit={handleSubmit} title="Entrar">
        <Fieldset>
          <legend>Usuário</legend>

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

        <footer>
          Ainda não possui uma conta? <br /> 
          <Link href="/sign-up">Cadastrar-se</Link>, 
          ou volte para a <Link href="/products">Página inicial</Link>.
        </footer>
      </Form>
    </GridContainer>
  );
};

export default FormData(SignIn, INITIAL_DATA, validate['sign-in']);
