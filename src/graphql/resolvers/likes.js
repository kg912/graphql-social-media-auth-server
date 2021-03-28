const Post = require('../../models/Post');
const { UserInputError, AuthenticationError } = require('apollo-server');

const { ERROR_MSG } = require('../../utils/constants');
const checkAuth = require('../../utils/check-auth');

module.exports = {
  Mutation: {
    async likePost(_, { postId }, context) {
      const { username } = checkAuth(context);

      const post = await Post.findById(postId);

      if (post) {
        isLiked = post.likes.find((like) => like.username === username);
        if (isLiked) {
          // Post already liked, unlike it
          post.likes = post.likes.filter((like) => like.username !== username);
        } else {
          // Not liked, like post
          post.likes.push({
            username,
            createdAt: new Date().toISOString(),
          });
        }

        await post.save();
        return post;
      } else {
        throw new UserInputError(ERROR_MSG.POST_NOT_FOUND);
      }
    },
  },
};
