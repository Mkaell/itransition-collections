const { Router } = require("express");
const router = Router();
const FullTextSearchController = require("../controllers/FullTextSearchController");

router.post("/", FullTextSearchController.find);
router.post("/tag", FullTextSearchController.findTags);

module.exports = router;