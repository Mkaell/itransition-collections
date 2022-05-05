const { Schema, model } = require("mongoose");

const itemSchema = new Schema(
  {
    collectionId: { type: String, required: true },
    dateCreate: { type: Date, required: true },
    usersByLikes: [{ type: String }],
  },
  { versionKey: false,
     strict: false  }
);

itemSchema.index({ "$**": "text" });

module.exports = model("Item", itemSchema);
