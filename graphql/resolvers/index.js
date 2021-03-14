const postResolvers = require('./posts');
const userResolvers = require('./users');
const commentsResolvers = require('./comments');
const likesResolvers = require('./likes');

module.exports = {
  // each time a query or a mutation returns this Post type, it will go through this "Modifier"
  Post: {
    likeCount: (parent) => parent.likes.length, // runs only when this field is queried
    commentCount: (parent) => parent.comments.length, // runs only when this field is queried
  },
  Query: {
    ...postResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...postResolvers.Mutation,
    ...commentsResolvers.Mutation,
    ...likesResolvers.Mutation,
  },
  Subscription: {
    ...postResolvers.Subscription,
  },
};
