const Collection = require("../models/Collections");
const Item = require("../models/Items");

const ItemController = {
  create: async (req, res) => {
    try {
      const { collectionId } = req.body;
      const itemFields = req.body
      console.log(collectionId);
      const collectionById = await Collection.findById(collectionId)
      .populate(
        "items"
      );

      const newItem = await Item.create({
        dateCreate: new Date(),
        ...itemFields,
      });

      await newItem.save();

      collectionById.items.push(newItem);
      await collectionById.save();

      res.status(200).json(collectionById);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },
  get: async (req, res) => {
    try {
      const itemId = req.params.iditem;

      const itemById = await Item.findById(itemId);
      let itemComments = itemById.comments;

      if (!itemComments.length) itemComments = [{ showAdd: true }];

      res.json(itemComments);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },
  delete: async (req, res) => {
    try {
      const itemId = req.params.iditem;

      await Item.findByIdAndDelete(itemId);

      res.json({});
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },
  edit: {
    fields: async (req, res) => {
      try {
        const { fieldName, fieldValue } = req.body;
        const itemId = req.params.iditem;

        if (typeof fieldName === "object") {
          const itemById = await Item.findById(itemId);

          let updatedField = itemById[fieldName[0]];
          updatedField[fieldName[1]] = fieldValue;

          await Item.findByIdAndUpdate(itemId, {
            [fieldName[0]]: updatedField,
          });
        } else {
          await Item.findByIdAndUpdate(itemId, { [fieldName]: fieldValue });
        }

        res.json({});
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
    },
    usersByLikes: async (req, res) => {
      try {
        const usersByLikes = req.body.usersByLikes;
        const itemId = req.params.iditem;

        await Item.findByIdAndUpdate(itemId, {
          usersByLikes,
        });

        res.json({});
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
    },
  },
};

module.exports = ItemController;