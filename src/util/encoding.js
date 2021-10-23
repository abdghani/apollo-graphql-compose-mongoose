const Hashids = require("hashids/cjs");
const { ObjectId, ObjectID } = require('mongodb');

/**
 * encodeObjectId return the encoded object id
 */
const encodeObjectId = (id) => {
  const hashids = new Hashids(process.env.ENCODE_SECRET);
  id = ObjectID.isValid(id) ? hashids.encodeHex(String(ObjectId(id))) : id;
  return id;
};

/**
 * encodeObjectId returns the object id from the encoded object id
 */
const decodeObjectId = (id) => {
  const hashids = new Hashids(process.env.ENCODE_SECRET);
  id = ObjectID.isValid(id) ? id : hashids.decodeHex(id);
  return id;
};

module.exports = {
    encodeObjectId,
    decodeObjectId
};