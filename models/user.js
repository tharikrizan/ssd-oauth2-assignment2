const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  facebookId: {
    type: String,
    require: true,
  },
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
