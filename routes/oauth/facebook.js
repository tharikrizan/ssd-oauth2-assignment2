const router = require("express").Router();
const facebook = require("../../controllers/facebook");

router.get("/callback", facebook.callback);
router.get("/oauth", facebook.oauth);
router.get("/user/:userId", facebook.getUserInfo);

module.exports = router;
