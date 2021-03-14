const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const ERROR_MSG = {
  EMPTY: {
    USERNAME: 'Username must not be empty',
    EMAIL: 'Email must not be empty',
    PASSWORD: 'Password must not be empty',
    COMMENT: 'Empty Comment',
    COMMENT_MSG: 'Comment body must not be empty',
  },
  INVALID: {
    EMAIL: 'Email must be a valid email address',
    PASSWORD: 'Passwords must match',
  },
  POST_NOT_FOUND: 'Post not found',
  AUTH: {
    MUST_BE: {
      BEARER: "Authentication token must be 'Bearer [token]",
      PROVIDED: 'Authorization header must be provided',
    },
    INVALID_TOKEN: 'Invalid/Expired token',
    NOT_ALLOWED: 'Action not allowed',
  },
};

const MSG = {
  POST_DELETED: 'Post deleted successfully',
};

module.exports = {
  emailRegex,
  ERROR_MSG,
  MSG,
};
