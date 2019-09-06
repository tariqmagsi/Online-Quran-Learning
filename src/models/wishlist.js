const mongoose = require("mongoose");

const wishListSchema = mongoose.Schema({
  course: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "Courses"
  },
  student: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "Profiles"
  },
  isEnrolled: {
    type: Boolean,
    default: false
  },
  isEnrolledByStudent: {
    type: Boolean,
    default: true
  }
});

const WishList = mongoose.model("WishList", wishListSchema);

module.exports = WishList;
