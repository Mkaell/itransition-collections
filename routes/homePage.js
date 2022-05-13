const { Router } = require("express");
const router = Router();
const HomePageController = require("../controllers/HomePageController");

router.get("/", HomePageController.get);

module.exports = router;