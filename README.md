# GraphQL Social Media Auth Server

Node.js app for managing authentication and posts for a social media app, using GraphQL and MongoDB


## Instructions
- Define `config.js` in the project root directory with the following
  ```
  module.exports = {
    MONGO_DB:
      'mongodb+srv://{USERNAME}:{PASSWORD}@{MONGODB_CLUSTER_URL}',
    SECRET_KEY: 'YOUR_KEY',
  };
  ```
- run app locally with `npm start`
