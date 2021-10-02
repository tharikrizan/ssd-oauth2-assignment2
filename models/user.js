const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  facebookToken: {
    type: String,
    required: true,
  },
  facebookData: {
    type: Object,
  },
});

module.exports = mongoose.model("User", userSchema);
