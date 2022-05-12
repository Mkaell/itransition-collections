const { Schema, model } = require("mongoose");
const Collection =require("./Collections");
const Item =require("./Items");

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    active: { type:Boolean, default: true, required: true },
    role: { type: Boolean, default: false, required: true },
    collections: [{ type: Schema.Types.ObjectId, ref: "Collection" }],
    created_at: {
      type: Date,
      default: new Date()
  },
    lastLogin: {
      type: Date,
      default: new Date()
  },
  },
  { versionKey: false }
);
userSchema.pre('remove', function(next) {
  Collection.remove({userId: this._id}).exec();
  Item.remove({userId: this._id}).exec();
  next();
});
module.exports = model("User", userSchema);
