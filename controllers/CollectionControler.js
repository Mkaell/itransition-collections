const Collection = require("../models/Collections");
const User = require("../models/Users");
const cloudinary = require('cloudinary').v2

const createCollection = async (req, res) => {
    try {
      const { collectionImage, collectionInfo, itemFields, userId } = req.body;
      const { name, description, theme } = collectionInfo;
      const { numerical, string, text, date, boolean } = itemFields;
      
      
      const userById = await User.findById(userId).populate("collections");
      const response = await cloudinary.uploader.upload(collectionImage, {folder: 'collection-app'})
      console.log(userById);
      const newCollection = await Collection.create({
        name,
        description,
        theme,
        image: response.secure_url,
        itemFields: {
          additional: { numerical, string, text, date, boolean },
        },
      });
      await newCollection.save();

      userById.collections.push(newCollection);
      await userById.save();

      res.status(200).json(newCollection);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
}
const getCollections = async (req, res) => {
    try {
      const { userId } = req.body;

      const collectionsByUser = await User.findById(userId).populate(
        "collections"
      );

      res.status(200).json(collectionsByUser.collections);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
const deleteCollection = async (req, res) => {
    try {
      const idCollection = req.params.idcoll;

      await Collection.findByIdAndDelete(idCollection);

      res.json({ message: "Сollection deleted" });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
}
module.exports = { 
    createCollection,
    getCollections,
    deleteCollection
    };