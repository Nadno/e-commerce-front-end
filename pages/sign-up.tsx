import React, { useCallback, FormEvent } from 'react';
import Form from '../src/components/Form';

import Input from '../src/components/Input';
import FormData from '../src/HOC/form';

const SignUp = FormData(
  ({ data, handleChange }) => {
    const [reqError, setReqError] = useState('');

    const handleSubmit = useCallback(async (e: FormEvent) => {
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
        stateAndCity,
      } = data;

      try {
        const account = await fetch('http://localhost:3333/user/sign-up', { 
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: `${giveName} ${surname}`,
            tel,
            email,
            password,
            avatar,
            address: `${zipCode}, ${address}, ${stateAndCity}`,
          }),
        }).then(res => res.json());

        if (!account.id) throw 'Não foi possível criar sua conta, pro favor tente novamente mais tarde';
      } catch (err) {
        setReqError(err);
      }
    }, []);

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
            placeholder="ex.: Rua 14, Quadra 10, Casa 5"
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

        {reqError && <span className="error">{reqError}</span>}
      </Form>
    );
  },
  {
    email: '',
    password: '',
    avatar: '',
    giveName: '',
    surname: '',
    tel: '',
    zipCode: '',
    address: '',
    stateAndCity: '',
  }
);

export default SignUp;
