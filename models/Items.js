const { Schema, model } = require("mongoose");

const itemSchema = new Schema(
  {
    collectionId: { type: String, required: true },
    date: { type: Date, required: true },
    usersByLikes: [{ type: String }],
    name: { type: String, required: true },
    tag: { type: String, required: true },
    numerical: [{ type: Number }],
    oneLine: [{ type: String }],
    textual: [{ type: String }],
    temporal: [{ type: Date }],
    boolean: [{ type: Boolean }],
  },
  { versionKey: false }
);

itemSchema.index({ "$**": "text" });

module.exports = model("Item", itemSchema);
