const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    active: { type: String, default: true, required: true },
    role: { type: String, default: 'user', required: true },
    collections: [{ type: Schema.Types.ObjectId, ref: "Collection" }],
  },
  { versionKey: false }
);

module.exports = model("User", userSchema);
