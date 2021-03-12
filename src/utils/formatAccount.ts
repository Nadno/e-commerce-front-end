export const formatAccountToForm = (account: any) => {
  const { id, name, address, ...rest } = account;
  
  const [giveName, surname] = name.split(' ');
  const [stateAndCity, street, block, district, house] = address.split(', ');
  const formattedAddress = [street, block, district].filter(a => a != null).join(', ');

  const getValidProperties = (acc: any, key: string) => {
    if (rest[key] != null) {
      acc[key] = rest[key];
    }
    return acc;
  };
  
  const formattedRest = Object.keys(rest).reduce(getValidProperties, {});

  return {
    ...formattedRest,
    password: '',
    stateAndCity,
    giveName,
    surname,
    house: house ?? '',
    address: formattedAddress,
  };
};

export const formatAccountToAPI = ({
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
}: any) => {
  const formattedAddress = `${stateAndCity}, ${address}, ${house}`;
  
  return {
    name: `${giveName} ${surname}`,
    tel,
    email,
    password,
    avatar,
    address: formattedAddress,
  };
};
