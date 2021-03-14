const { emailRegex, ERROR_MSG } = require('./constants');

module.exports.validateRegisterInput = (
  username,
  email,
  password,
  confirmPassword
) => {
  const isEmailValid = emailRegex.test(email);
  const passwordsDontMatch = password !== confirmPassword && {
    confirmPassword: ERROR_MSG.INVALID.PASSWORD,
  };

  const errors = {
    ...(!username && { username: ERROR_MSG.EMPTY.USERNAME }),
    ...(!email
      ? { email: ERROR_MSG.EMPTY.EMAIL }
      : { ...(!isEmailValid && { email: ERROR_MSG.INVALID.EMAIL }) }),
    ...(!password
      ? { password: ERROR_MSG.EMPTY.PASSWORD }
      : {
          ...passwordsDontMatch,
        }),
  };

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateLoginInput = (username, password) => {
  const errors = {
    ...(!username && { username: ERROR_MSG.EMPTY.USERNAME }),
    ...(!password && { password: ERROR_MSG.EMPTY.PASSWORD }),
  };

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
