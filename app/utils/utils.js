export function priceFormater({price}) {
  const ARPrice = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'usd',
    minimumFractionDigits: 0,
  });
  return ARPrice.format(price);
}

export const userValidation = () => {
  const isValidPhoneNumber = value => /^\d+$/.test(value);
  const validateUserField = (field, value) => {
    switch (field) {
      case 'fantasyName':
      case 'firstName':
      case 'lastName':
        return value === '' ? 'Campo obligatorio.' : '';
      case 'cuit':
        return value === ''
          ? 'Completar con un número de CUIT.'
          : value.length !== 11
          ? 'El CUIT debe tener 11 dígitos.'
          : '';
      case 'mail':
      case 'contactMail':
        return value === ''
          ? 'Completar con un email.'
          : !isValidEmail(value)
          ? 'El email ingresado no es válido.'
          : '';
      case 'password':
        return value === ''
          ? 'Completar con una contraseña.'
          : value.length < 8
          ? 'La contraseña debe tener al menos 8 caracteres.'
          : !/[A-Z]/.test(value)
          ? 'La contraseña debe tener al menos una letra mayúscula.'
          : '';
      case 'phone':
        return value === ''
          ? 'Completar con un número de teléfono.'
          : value.length !== 10
          ? 'El número de teléfono debe tener 10 dígitos.'
          : !isValidPhoneNumber(value)
          ? 'El número de teléfono solo debe contener dígitos numéricos.'
          : '';
      default:
        return '';
    }
  };
  return {validateUserField};
};

const isValidEmail = email => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
