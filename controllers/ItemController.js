const Collection = require("../models/Collections");
const Item = require("../models/Items");

const ItemController = {
  create: async (req, res) => {
    try {
      const { collectionId } = req.body;
      const itemFields = req.body
      
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
      const idItem = req.params.iditem;
      
      const itemById = await Item.findById(idItem);

      res.status(200).json(itemById);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  },
  delete: async (req, res) => {
    try {
		const {iditem} = req.params;
		const {collectionId} = req.body;
		
		await Collection.updateOne({ _id: collectionId },
			{ $pull: { items: iditem}}
		);
		await Item.findByIdAndDelete(iditem);

		res.status(200).json({message: "Item deleted successfully"});
    } catch (e) {
		res.status(500).json({ message: e.message });
    }
  },
  edit: {
    fields: async (req, res) => {
      try {
        const itemFields = req.body;
        const itemId = req.params.iditem;

        await Item.findByIdAndUpdate(itemId, itemFields);
        
        res.status(200).json({ message: "Item update successfully" });
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
        }
        );

        res.json({message: "Item like successfully"});
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
    },
  },
};

module.exports = ItemController;