const User = require('@app/module/user')
const Post = require('@app/module/post')

Post.tc.addRelation('createdByUser', {
  resolver: () => User.tc.getResolver('findById'),
  prepareArgs: {
    _id: source => source.createdBy
  },
  projection: { createdByUser: 1 }
})
