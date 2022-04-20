const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    active: { type:Boolean, default: true, required: true },
    role: { type: Boolean, default: false, required: true },
    collections: [{ type: Schema.Types.ObjectId, ref: "Collection" }],
  },
  { versionKey: false }
);

module.exports = model("User", userSchema);
