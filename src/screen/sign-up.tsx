import React, { useCallback, FormEvent, useState } from 'react';
import { Form, Submit } from '../components/Form';

import { apiPost } from '../utils/api';
import handleRequest from '../utils/handleRequests';
import Link from '../components/Link';
import FormData, { FormComponent } from '../HOC/form';
import useAccount from '../hooks/useAccount';
import validate from '../utils/validation/validate';
import {
  UserAccount,
  UserAbout,
  UserAddress,
} from '../components/SignUpFields';
import { formatAccountToAPI } from '../utils/formatAccount';
import useModal from '../hooks/useModal';

export const INITIAL_DATA = {
  email: '',
  password: '',
  confirmPassword: '',
  avatar: '',
  giveName: '',
  surname: '',
  house: '',
  tel: '',
  zipCode: '',
  address: '',
  stateAndCity: '',
};

interface Props {
  goToPath?: string;
}

export type SignUpData = typeof INITIAL_DATA;

export const SignUp: FormComponent<SignUpData, Props> = ({
  data,
  invalid,
  goToPath = '/',
  ...props
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

      apiPost('/user/sign-up', formatAccountToAPI(data))
        .then(({ data: account }) => login(account, goToPath))
        .catch(handleRequest(unsuccessSign));
    },
    [data, invalid]
  );

  return (
    <Form onSubmit={handleSubmit}>
      <h1 className="title">Cadastre-se</h1>

      <UserAccount data={data} {...props} />
      <UserAbout data={data} {...props} />
      <UserAddress data={data} {...props} />
      <Submit>Cadastrar-se</Submit>

      <footer>
        Já tem uma conta? <Link href="/sign-in">Entrar</Link>
      </footer>
    </Form>
  );
};

export default FormData(SignUp, INITIAL_DATA, validate['sign-up']);
