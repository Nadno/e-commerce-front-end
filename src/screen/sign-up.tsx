import React, { useCallback, FormEvent, useState } from 'react';
import Form from '../components/Form';

import Input from '../components/Input';
import Link from '../components/Link';
import FormData, { WrappedComponent } from '../HOC/form';
import useAccount from '../hooks/useAccount';
import { apiPost } from '../utils/api';
import handleRequest from '../utils/handleRequests';
import validate from '../utils/validate';

const INITIAL_DATA = {
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

type SignUpData = typeof INITIAL_DATA;

const SignUp: WrappedComponent<SignUpData, Props> = ({
  data,
  inputError,
  invalid,
  goToPath = '/',
  handleChange,
}) => {
  const [error, setError] = useState('');
  const { login } = useAccount();

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (invalid) {
        alert('Preencha todos os campos');
        return;
      }

      const {
        email,
        password,
        avatar,
        giveName,
        surname,
        tel,
        zipCode,
        address,
        house,
        stateAndCity,
      } = data;

      const { response } = apiPost('/user/sign-up', {
        name: `${giveName} ${surname}`,
        tel,
        email,
        password,
        avatar,
        address: `${zipCode}, ${address}, ${house}, ${stateAndCity}`,
      });

      response
        .then(({ data: account }) => login(account, goToPath))
        .catch(handleRequest(setError));
    },
    [data]
  );

  return (
    <Form onSubmit={handleSubmit}>
      <h1 className="title">Cadastre-se</h1>
      <Form.Fieldset>
        <legend>Sua conta</legend>

        <Input
          id="email"
          name="email"
          value={data.email}
          error={inputError.email}
          label="Email"
          placeholder="Digite seu e-mail"
          onChange={handleChange}
        />
        <div className="input-block">
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

          <Input
            type="password"
            id="confirm-password"
            name="confirmPassword"
            value={data.confirmPassword}
            error={inputError.confirmPassword}
            label="Confirmar senha"
            placeholder="Digite sua senha novamente"
            onChange={handleChange}
          />
        </div>

        <Input
          type="url"
          id="avatar"
          name="avatar"
          value={data.avatar}
          error={inputError.avatar}
          label="Foto / Avatar"
          placeholder="ex.: http://exemplo.com (opcional)"
          onChange={handleChange}
        />
      </Form.Fieldset>

      <Form.Fieldset>
        <legend>Sobre você</legend>

        <div className="input-block">
          <Input
            id="give-name"
            name="giveName"
            value={data.giveName}
            error={inputError.giveName}
            label="Nome"
            placeholder="Primeiro Nome"
            onChange={handleChange}
          />

          <Input
            id="surname"
            name="surname"
            value={data.surname}
            error={inputError.surname}
            label="Sobrenome"
            placeholder="Sobrenome"
            onChange={handleChange}
          />
        </div>

        <Input
          id="tel"
          name="tel"
          value={data.tel}
          error={inputError.tel}
          label="Telefone celular"
          placeholder="ex.: 61 912345678"
          onChange={handleChange}
        />
      </Form.Fieldset>

      <Form.Fieldset>
        <legend>Endereço</legend>

        <div className="input-block">
          <Input
            id="zip-code"
            name="zipCode"
            value={data.zipCode}
            error={inputError.zipCode}
            label="CEP"
            placeholder="CEP"
            onChange={handleChange}
          />

          <Input
            id="address"
            name="address"
            value={data.address}
            error={inputError.address}
            label="Endereço"
            placeholder="ex.: Rua 14, Quadra 10"
            onChange={handleChange}
          />
        </div>

        <div className="input-block">
          <Input
            id="house"
            name="house"
            value={data.house}
            error={inputError.house}
            label="Casa"
            placeholder="Número ou Letra"
            onChange={handleChange}
          />

          <Input
            id="state-and-city"
            name="stateAndCity"
            value={data.stateAndCity}
            error={inputError.stateAndCity}
            label="Estado e Cidade"
            placeholder="ex.: Brasília DF"
            onChange={handleChange}
          />
        </div>

        <Form.Submit>Cadastrar-se</Form.Submit>
      </Form.Fieldset>

      <footer>
        Já tem uma conta? <Link href="/sign-in">Entrar</Link>
      </footer>

      {error && <span className="error">{error}</span>}
    </Form>
  );
};

export default FormData(SignUp, INITIAL_DATA, validate['sign-up']);
