export const isValidEmail = (email) => {
  const message = "Please enter a valid email address";
  const value = /\S+@\S+\.\S+/.test(email);
  return [value, message];
};

export const isValidUserName = (username) => {
  const message = "Please enter a valid username";
  if (username.length > 3) {
    return [true, message];
  }
  return [false, message];
};

export const isValidPassword = (password) => {
  const message = "Password should longer than 4 digits";
  if (password.length > 4) {
    return [true, message];
  }
  return [false, message];
};

export const isSamePassword = (password, orginalPassword) => {
  const message = "Please enter the same password";
  if (password !== orginalPassword) {
    return [false, message];
  }
  return [true, message];
};
