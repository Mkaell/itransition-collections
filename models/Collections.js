const { Schema, model } = require("mongoose");

const collectionSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    theme: { type: String, required: true },
    image: String,
    itemFields: {
      basic: {
        id: { type: String, default: "id" },
        name: { type: String, default: "name" },
        tag: { type: String, default: "tag" },
      },
      additional: {
        numerical: [{ type: String }],
        string: [{ type: String }],
        text: [{ type: String }],
        date: [{ type: String }],
        boolean: [{ type: String }],
      },
    },
    items: [{ type: Schema.Types.ObjectId, ref: "Item" }],
  },
  { versionKey: false }
);

collectionSchema.index({ "$**": "text" });

module.exports = model("Collection", collectionSchema);
