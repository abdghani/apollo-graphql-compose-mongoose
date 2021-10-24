const PostModel = require('@app/module/post/model')
const { isUndefined, isNull } = require('@app/util/check')
const { pubsub, topics } = require('@app/pubsub')

const createPosts = {
  name: 'createPosts',
  type: 'Post!',
  args: {
    title: 'String!',
    content: 'String'
  },
  resolve: async({ args: { title, content }, context: { user } }) => {
    try {
      const newPost = await new PostModel({
        createdBy: user._id,
        title,
        content
      }).save()
      pubsub.publish(topics.POST_ADDED, { payload: newPost })
      return newPost
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

const updatePostById = {
  name: 'updatePostById',
  type: 'Post!',
  args: {
    postId: 'String!',
    title: 'String',
    content: 'String'
  },
  resolve: async ({ args: { postId, title, content } }) => {
    try {
      const post = await PostModel.findOne({ _id: postId }).exec()
      if (isNull(post)) return Promise.reject(new Error('Post not found.'))
      if (!isUndefined(title)) post.title = title
      if (!isUndefined(content)) post.content = content

      await post.save()
      return post
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

// subscription
const onPostAdded = {
  name: 'onPostAdded',
  description: 'Subscribe to listen to new post',
  type: 'JSON!',
  resolve: ({ payload }) => payload,
  subscribe: () => pubsub.asyncIterator(topics.POST_ADDED)
}

module.exports = {
  createPosts,
  updatePostById,
  onPostAdded
}
