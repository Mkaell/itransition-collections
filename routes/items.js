const { Router } = require("express");
const router = Router();
const ItemControls = require("../controllers/ItemController");

router.post("/create", ItemControls.create);
router.get("/get/:iditem", ItemControls.get);
router.delete("/delete/:iditem", ItemControls.delete);
router.post("/edit/fields/:iditem", ItemControls.edit.fields);
router.patch("/edit/like/:iditem", ItemControls.edit.usersByLikes);

module.exports = router;