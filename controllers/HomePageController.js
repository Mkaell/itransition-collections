const Collection = require("../models/Collections");
const Item = require("../models/Items");

const HomePageController = {
	get: async (req, res) => {
	try {
		const lastAddedItems = await Item.find({}).sort({ dateCreate: -1 }).limit(4);
		const bigCollections = await Collection.aggregate([
			{
				$addFields: {
					items_length: {
					$size: "$items"
					}
				}
			},
			{
				$sort: {
					items_length: -1
				}
			}
		]).limit(4);

		res.status(200).json({ lastAddedItems, bigCollections });
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
},
};

module.exports = HomePageController;