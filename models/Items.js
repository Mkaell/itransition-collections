const { Schema, model } = require("mongoose");

const itemSchema = new Schema(
  {
    collectionId: { type: String, required: true },
    dateCreate: { type: Date, required: true },
    usersByLikes: [{ type: String }],
    // name: { type: String, required: true },
    // tags: [{ type: String, required: true }],
    // numerical: [{ type: Number }],
    // string: [{ type: String }],
    // text: [{ type: String }],
    // date: [{ type: Date }],
    // boolean: [{ type: Boolean }],
  },
  { versionKey: false,
     strict: false  }
);

itemSchema.index({ "$**": "text" });

module.exports = model("Item", itemSchema);
