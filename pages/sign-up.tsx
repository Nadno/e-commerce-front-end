import React, { useCallback, FormEvent, useState } from 'react';
import Form from '../src/components/Form';

import Input from '../src/components/Input';
import FormData from '../src/HOC/form';
import useAccount from '../src/useAccount';
import { apiPost } from '../src/utils/api';
import handleRequest from '../src/utils/handleRequests';

const SignUp = FormData(
  ({ data, handleChange }) => {
    const [error, setError] = useState('');
    const { login } = useAccount();

    const handleSubmit = useCallback(
      (e: FormEvent) => {
        e.preventDefault();
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

        apiPost('/user/sign-up', {
          name: `${giveName} ${surname}`,
          tel,
          email,
          password,
          avatar,
          address: `${zipCode}, ${address}, ${house}, ${stateAndCity}`,
        })
          .then(({ data: account }) => login(account))
          .catch(handleRequest(setError));
      },
      [data]
    );

    return (
      <Form onSubmit={handleSubmit}>
        <Form.Fieldset>
          <legend>Sua conta</legend>
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

          <Input
            type="url"
            id="avatar"
            name="avatar"
            value={data.avatar}
            label="Foto / Avatar"
            placeholder="http://exemplo.com"
            handleChange={handleChange}
          />
        </Form.Fieldset>

        <Form.Fieldset>
          <legend>Sobre você</legend>
          <Input
            id="give-name"
            name="giveName"
            value={data.giveName}
            label="Nome"
            placeholder="Primeiro Nome"
            handleChange={handleChange}
          />

          <Input
            id="surname"
            name="surname"
            value={data.surname}
            label="Sobrenome"
            placeholder="Sobrenome"
            handleChange={handleChange}
          />

          <Input
            id="tel"
            name="tel"
            value={data.tel}
            label="Telefone celular"
            placeholder="ex.: 61 912345678"
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
            placeholder="ex.: Rua 14, Quadra 10"
            handleChange={handleChange}
          />

          <Input
            id="house"
            name="house"
            value={data.house}
            label="Casa"
            placeholder="Número ou Letra"
            handleChange={handleChange}
          />

          <Input
            id="state-and-city"
            name="stateAndCity"
            value={data.stateAndCity}
            label="Estado e Cidade"
            placeholder="ex.: Brasília DF"
            handleChange={handleChange}
          />

          <Form.Submit>Cadastrar-se</Form.Submit>
        </Form.Fieldset>

        {error && <span className="error">{error}</span>}
      </Form>
    );
  },
  {
    email: '',
    password: '',
    avatar: '',
    giveName: '',
    surname: '',
    house: '',
    tel: '',
    zipCode: '',
    address: '',
    stateAndCity: '',
  }
);

export default SignUp;
