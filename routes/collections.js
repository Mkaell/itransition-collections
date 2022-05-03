const express = require("express");
const router = express.Router();
const {
    deleteCollection,
    createCollection,
    getCollections,
    getCollection
        } = require('../controllers/CollectionControler');

router.post("/create", createCollection);
router.post("/get", getCollections);
router.post("/get/:idcoll", getCollection);
router.delete("/delete/:idcoll", deleteCollection);

module.exports = router;