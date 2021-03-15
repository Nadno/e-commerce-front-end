import { FormProps } from '../../HOC/form';
import { SignUpData } from '../../screen/sign-up';
import { Fieldset } from '../Form/style';
import { Input } from '../Input';

interface FieldProps<WithProps extends keyof SignUpData>
  extends Omit<FormProps<Pick<SignUpData, WithProps>>, 'validSubmit'> {}

const UserAccount: React.FC<
  FieldProps<'email' | 'password' | 'confirmPassword' | 'avatar'>
> = ({ data, inputError, handleChange }) => {
  return (
    <Fieldset>
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
    </Fieldset>
  );
};

const UserAbout: React.FC<FieldProps<'giveName' | 'surname' | 'tel'>> = ({
  data,
  inputError,
  handleChange,
}) => {
  return (
    <Fieldset>
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
    </Fieldset>
  );
};

const UserAddress: React.FC<
  FieldProps<'cep' | 'address' | 'house' | 'stateAndCity'>
> = ({ data, inputError, handleChange }) => {
  return (
    <Fieldset>
      <legend>Endereço</legend>

      <div className="input-block">
        <Input
          id="cep"
          name="cep"
          value={data.cep}
          error={inputError.cep}
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
    </Fieldset>
  );
};

export { UserAccount, UserAbout, UserAddress };
