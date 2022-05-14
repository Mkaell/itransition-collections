const express = require("express");
const router = express.Router();
const {
    deleteCollection,
    createCollection,
    getCollections,
    getCollection,
    updateCollection
        } = require('../controllers/CollectionControler');

router.post("/create", createCollection);
router.post("/get", getCollections);
router.patch("/update/:idcoll", updateCollection);
router.post("/get/:idcoll", getCollection);
router.delete("/delete/:idcoll", deleteCollection);

module.exports = router;