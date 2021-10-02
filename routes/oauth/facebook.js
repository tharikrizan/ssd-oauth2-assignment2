const router = require("express").Router();
const facebook = require("../../controllers/facebook");

router.get("/callback", facebook.callback);
router.get("/oauth", facebook.oauth);

module.exports = router;
