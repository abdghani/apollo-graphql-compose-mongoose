const PostTC = require('@app/module/post/types')
const resolvers = require('@app/module/post/resolvers')
const { authMiddleware: middleware } = require('@app/middleware')

for (const resolver in resolvers) {
  PostTC.addResolver(resolvers[resolver])
}

module.exports = {
  tc: PostTC,
  query: {
    getPosts: PostTC.getResolver('pagination', [middleware.isAuth])
  },
  mutation: {
    createPost: PostTC.getResolver('createPosts', [middleware.isAuth]),
    updatePostById: PostTC.getResolver('updatePostById', [middleware.isAuth])
  },
  subscription: {
    onPostAdded: resolvers.onPostAdded
  }
}
