export const onlyTextValidation = (value) => {
  if (value) {
    if (/^[a-zA-Z ]*$/i.test(value)) {
      return undefined;
    } else {
      return "Alphabetical letters only";
    }
  } else {
    return undefined;
  }
};

export const passwordValidation = (value) => {
  if (value) {
    if (
      /^[a-zA-Z 0-9-!@#$%^&*()_+]*$/i.test(value) &&
      value.length > 7 &&
      value.length < 21
    ) {
      return undefined;
    } else {
      return "Invalid Password: numbers and letters, special characters allowed !@#$%^&*()_+, number of characters should be greater than 8 but less than 21 ";
    }
  } else {
    return undefined;
  }
};

export const alphaNumericValidation = (value) => {
  if (value) {
    if (/^[a-zA-Z 0-9]*$/i.test(value)) {
      return undefined;
    } else {
      return "Numbers and Letters only";
    }
  } else {
    return undefined;
  }
};
