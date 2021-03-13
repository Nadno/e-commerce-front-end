import React, { FormEvent, useCallback, useEffect, useState } from 'react';

import useAccount from '../hooks/useAccount';

import { AccountHeader } from '../components/Header';
import Form from '../components/Form';
import { Fieldset } from '../components/Form/style';
import FormData, { FormComponent } from '../HOC/form';
import { SignUpData, INITIAL_DATA } from '../screen/sign-up';
import { GridContainer } from '../components/Container/style';
import { UserAbout, UserAddress } from '../components/SignUpFields';
import { Submit } from '../components/Button';

import validate from '../utils/validation/validate';
import { apiGet, apiPut } from '../utils/api';
import { Input } from '../components/Input';
import { storeAccount } from '../utils/account';
import {
  formatAccountToForm,
  formatAccountToAPI,
} from '../utils/formatAccount';
import useModal from '../hooks/useModal';
import handleRequest from '../utils/handleRequests';

const AccountForm: FormComponent<SignUpData> = ({
  data,
  inputError,
  ...props
}) => {
  const [createModal, openModal] = useModal();

  const successUpdate = useCallback(({ data }) => {
    const { status, ...account } = data;
    if (status === 200) {
      storeAccount({ account });

      createModal.warn({
        message: 'Alterações feitas conta sucesso!',
      });
    }

    openModal();
  }, []);

  const unsuccessUpdate = useCallback(message => {
    createModal.warn({
      message,
    });

    openModal();
  }, []);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      apiPut('/user/update', formatAccountToAPI(data))
        .then(successUpdate)
        .catch(handleRequest(unsuccessUpdate));
    },
    [data]
  );

  return (
    <Form onSubmit={handleSubmit} title="Alterar conta">
      <Fieldset>
        <Input
          type="url"
          id="avatar"
          name="avatar"
          value={data.avatar}
          error={inputError.avatar}
          label="Foto / Avatar"
          placeholder="ex.: http://exemplo.com (opcional)"
          onChange={props.handleChange}
        />
      </Fieldset>

      <UserAbout data={data} inputError={inputError} {...props} />
      <UserAddress data={data} inputError={inputError} {...props} />

      <Fieldset>
        <legend>Confirmação</legend>

        <Input
          id="email"
          name="email"
          value={data.email}
          error={inputError.email}
          label="E-mail"
          placeholder="Digite seu e-mail"
          onChange={props.handleChange}
        />

        <Input
          type="password"
          id="password"
          name="password"
          value={data.password}
          error={inputError.password}
          label="Senha"
          placeholder="Digite seu senha"
          onChange={props.handleChange}
        />
      </Fieldset>

      <Submit>Salvar</Submit>
    </Form>
  );
};

const Account = () => {
  const [initialData, setInitialData] = useState<SignUpData>({
    ...INITIAL_DATA,
  });
  const { id } = useAccount().account;

  const getAccount = useCallback(() => {
    if (!id) return;
    const res = apiGet(`/user/${id}`).send();
    res
      .then(({ data }) =>
        setInitialData(prev => ({
          ...prev,
          ...formatAccountToForm(data.account),
        }))
      )
      .catch(console.log);
  }, [id]);

  useEffect(getAccount, [id]);

  const WrappedAccountForm = FormData(
    AccountForm,
    initialData,
    validate['sign-up']
  );

  return (
    <GridContainer>
      <AccountHeader />
      <WrappedAccountForm />
    </GridContainer>
  );
};

export default Account;
