const { Router } = require("express");
const router = Router();
const UserMainController = require("../controllers/HomePageController");

router.get("/", UserMainController.get);

module.exports = router;