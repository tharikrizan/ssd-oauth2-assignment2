const router = require("express").Router();

router.get("/", (_, res) => {
  return res.json({
    isError: false,
    status: "Ok",
  });
});

module.exports = router;
