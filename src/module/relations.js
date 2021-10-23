// const User = require("@app/module/user");
// const Entity = require("@app/module/entity");
// const Sop = require("@app/module/sopRequest");

// User.tc.addRelation("entity", {
//   resolver: () => Entity.tc.getResolver("findById"),
//   prepareArgs: {
//     _id: (source) => source.entityId,
//   },
//   projection: { entity: 1 },
// });

// Sop.tc.addRelation("entity", {
//   resolver: () => Entity.tc.getResolver("findById"),
//   prepareArgs: {
//     _id: (source) => source.entity,
//   },
//   projection: { entity: 1 },
// });

// Sop.tc.addRelation("createdBy", {
//   resolver: () => User.tc.getResolver("findById"),
//   prepareArgs: {
//     _id: (source) => source.createdBy,
//   },
//   projection: { createdBy: 1 },
// });
