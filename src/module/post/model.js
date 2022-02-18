const mongoose = require('@app/service/mongoose')

const { Schema } = mongoose

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  // timestamps automatically manages
  // createdAt and updatedAt field for entries
  { timestamps: true }
)

const Post = mongoose.model('Post', postSchema)

module.exports = Post
