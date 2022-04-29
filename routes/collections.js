const express = require("express");
const router = express.Router();
const {
    deleteCollection,
    createCollection,
    getCollections
        } = require('../controllers/CollectionControler');

router.post("/create", createCollection);
router.post("/get", getCollections);
router.delete("/delete/:idcoll", deleteCollection);

module.exports = router;