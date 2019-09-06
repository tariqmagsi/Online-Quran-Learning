const mongoose = require("mongoose");
const WishList = require("./wishlist");

const courseSchema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: true
    },
    price: {
      type: String
    },
    file: [
      {
        name: {
          type: String
        },
        files: {
          type: String
        }
      }
    ],
    lectures: [
      {
        name: {
          type: String
        },
        lecture: {
          type: String
        }
      }
    ],
    announcements: [
      {
        subject: {
          type: String
        },
        message: {
          type: String
        },
        date: {
          type: String,
          default:
            Date().split(" ")[0] +
            " " +
            Date().split(" ")[1] +
            " " +
            Date().split(" ")[2] +
            " " +
            Date().split(" ")[3]
        }
      }
    ],
    description: {
      type: String,
      default: ""
    }
  },
  { toObject: { virtuals: true }, timestamps: true }
);
courseSchema.virtual("wishlist", {
  ref: "WishList",
  localField: "_id",
  foreignField: "course"
});

courseSchema.statics.findByCredentials = async name => {
  const course = await Courses.findOne({ name });

  if (!course) {
    throw new Error("Course Not Found");
  }
  return course;
};
courseSchema.pre("remove", async function(next) {
  const courseId = this;

  await WishList.deleteMany({ course: courseId._id });
  console.log(courseId._id);
  next();
});

courseSchema.methods.toJSON = function() {
  const course = this;
  const courseFileData = course.toObject();
  delete courseFileData.file;
  return courseFileData;
};

const Courses = mongoose.model("Courses", courseSchema);

module.exports = Courses;
