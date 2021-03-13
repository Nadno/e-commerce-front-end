import React, { useCallback, FormEvent } from 'react';
import Link from 'next/link';

import {
  UserAccount,
  UserAbout,
  UserAddress,
} from '../components/SignUpFields';
import Form from '../components/Form';
import handleRequest from '../utils/handleRequests';
import FormData, { FormComponent } from '../HOC/form';

import useModal from '../hooks/useModal';
import useAccount from '../hooks/useAccount';
import { apiPost } from '../utils/api';
import validate from '../utils/validation/validate';
import { formatAccountToAPI } from '../utils/formatAccount';
import { Submit } from '../components/Button';

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
    <Form onSubmit={handleSubmit} title="Cadastre-se">
      <UserAccount data={data} {...props} />
      <UserAbout data={data} {...props} />
      <UserAddress data={data} {...props} />
      <Submit>Cadastrar-se</Submit>

      <footer>
        Já possui uma conta? <br /> <Link href="/sign-in">Entrar</Link>
      </footer>
    </Form>
  );
};

export default FormData(SignUp, INITIAL_DATA, validate['sign-up']);
