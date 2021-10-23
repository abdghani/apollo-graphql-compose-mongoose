// contains custom input type for this module

const { schemaComposer } = require("graphql-compose");

const UserUpdate = schemaComposer.createObjectTC({
  name: "UserUpdate",
  fields: {
    name: {
      type: "String",
      description: "Full name of the user",
    },
    profilePic: {
      type: "String",
      description: "Profile pic url of the user",
    },
  },
});

module.exports = {
  UserUpdate,
};
