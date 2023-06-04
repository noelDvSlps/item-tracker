export const onlyTextValidation = (value) => {
  if (!value) {
    return false;
  }
  if (!/^[a-zA-Z ]*$/i.test(value)) {
    return false;
  }
  return true;
};

export const passwordValidation = (value) => {
  if (!value) {
    return false;
  }

  if (
    /^[a-zA-Z 0-9-!@#$%^&*()_+]*$/i.test(value) &&
    value.length > 7 &&
    value.length < 21
  ) {
    return true;
  }

  return false;
};

export const alphaNumericValidation = (value) => {
  if (!value) {
    return false;
  }
  if (/^[a-zA-Z 0-9]*$/i.test(value)) {
    return true;
  }
};

export const comparePasswords = (passwordInput, confirmPassword) => {
  return passwordInput === confirmPassword ? true : false;
};
