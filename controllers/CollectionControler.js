const Collection = require("../models/Collections");
const User = require("../models/Users");
const Item = require("../models/Items");
const cloudinary = require('cloudinary').v2

const createCollection = async (req, res) => {
	try {
		const { collectionImage, collectionInfo, itemFields, userId } = req.body;
		const { name, description, theme } = collectionInfo;
		const { numerical, string, text, date, boolean } = itemFields;
		let img ='';

		const userById = await User.findById(userId).populate("collections");

		if(collectionImage){
			img = await cloudinary.uploader.upload(collectionImage, {folder: 'collection-app'})

		}
		
		const newCollection = await Collection.create({
			name,
			description,
			theme,
			image: img ? img.secure_url : '',
			public_id:  img ? img.public_id : '' ,
			itemFields: {
				additional: { numerical, string, text, date, boolean },
			},
			userId,	
		});
		
		await newCollection.save();

		userById.collections.push(newCollection);
		await userById.save();

		res.status(200).json(newCollection);
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
}
const getCollection = async (req, res) => {
	try {
		const collectionId = req.params.idcoll;

		const itemsByCollection = await Collection.findById(collectionId).populate("items");

		res.status(200).json(itemsByCollection);
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
}

const getCollections = async (req, res) => {
	try {
		const { userId } = req.body;

		const collectionsByUser = await User.findById(userId).populate("collections");

		res.status(200).json(collectionsByUser.collections);
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
}
const deleteCollection = async (req, res) => {
	try {
		const idCollection = req.params.idcoll;
		const {userId, public_id} = req.body;

		if(public_id){
			await cloudinary.uploader.destroy(public_id, {folder: 'collection-app'})
		}
		
		await User.updateOne({ _id: userId },
			{ $pull: { collections: idCollection}}
		);
		await Item.deleteMany({collectionId: idCollection})
		await Collection.findByIdAndDelete(idCollection).populate('items')
	
		res.status(200).json({ message: "??ollection deleted" });
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
}

const updateCollection = async (req, res) => {
	try {
		const { description, name } = req.body;
		const idcoll = req.params.idcoll;

		await Collection.findByIdAndUpdate(idcoll, { description, name });

		res.status(200).json({ message: "??ollection update" });
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
}

module.exports = { 
	createCollection,
	getCollections,
	deleteCollection,
	getCollection,
	updateCollection
	};