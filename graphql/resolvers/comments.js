const Post = require('../../models/Post');
const { UserInputError, AuthenticationError } = require('apollo-server');

const { ERROR_MSG } = require('../../utils/constants');
const checkAuth = require('../../utils/check-auth');

module.exports = {
  Mutation: {
    async createComment(_, { postId, body }, context) {
      const { username } = checkAuth(context);

      if (!body) {
        throw new UserInputError(ERROR_MSG.EMPTY.COMMENT, {
          errors: {
            body: ERROR_MSG.EMPTY.COMMENT_MSG,
          },
        });
      }

      const post = await Post.findById(postId);

      if (post) {
        // use unshift to add to the front of the comments array
        post.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString(),
        });

        await post.save();
        return post;
      } else {
        throw new UserInputError(ERROR_MSG.POST_NOT_FOUND);
      }
    },

    async deleteComment(_, { postId, commentId }, context) {
      const { username } = checkAuth(context);

      const post = await Post.findById(postId);

      if (post) {
        const commentIndex = post.comments.findIndex((c) => c.id === commentId);

        if (post.comments[commentIndex].username === username) {
          post.comments.splice(commentIndex, 1);
          await post.save();
          return post;
        } else {
          throw new AuthenticationError(ERROR_MSG.AUTH.NOT_ALLOWED);
        }
      } else {
        throw new UserInputError(ERROR_MSG.POST_NOT_FOUND);
      }
    },
  },
};
