const { schemaComposer } = require("graphql-compose");

const Succeed = schemaComposer.createObjectTC({
  name: "Succeed",
  fields: { succeed: "Boolean!" },
});

const FilesTC = schemaComposer
  .createObjectTC({
    name: "File",
    fields: {
      filename: {
        type: "String",
        description: "name of the file",
      },
      mimetype: {
        type: "String",
        description: "Mime type of the file",
      },
      uploadedBy: {
        type: "ID",
        description: "eid of the user",
      },
      url: {
        type: "String",
        description: "url of the file",
      },
    },
  })
  .removeField("_id");

module.exports = {
  Succeed,
  FilesTC,
};
