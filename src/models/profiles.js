const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const WishList = require("./wishlist");

const profileSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    age: {
      type: String
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,

      validate(value) {
        if (!validator.isEmail(value)) throw new Error("Email not valid");
      }
    },
    contact: { type: String },
    country: { type: String },
    password: {
      type: String
    },
    isAdmin: { type: Boolean, default: false },
    isTeacher: { type: Boolean, default: false },
    messages: [
      {
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
        },
        name: {
          type: String,
          default: ""
        },
        message: {
          type: String,
          default: ""
        },
        email: {
          type: String,
          default: ""
        }
      }
    ],
    gender: { type: String },
    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ]
  },
  { toObject: { virtuals: true }, timestamps: true }
);
profileSchema.virtual("wishlist", {
  ref: "WishList",
  localField: "_id",
  foreignField: "student"
});

profileSchema.statics.findByCredentials = async (email, password) => {
  const profile = await Profiles.findOne({ email });
  if (!profile) {
    throw new Error("Unable to login");
  }
  const isMatch = await bcrypt.compare(password, profile.password);
  if (!isMatch) {
    throw new Error("Unable to login");
  }
  return profile;
};
profileSchema.statics.findByCredentialsEmail = async email => {
  const profile = await Profiles.findOne({ email });
  if (!profile) {
    throw new Error("Email Not Exists");
  }

  return profile;
};
profileSchema.methods.toJSON = function() {
  const profile = this;
  const publicProfileData = profile.toObject();
  delete publicProfileData.password;
  delete publicProfileData.tokens;
  return publicProfileData;
};
profileSchema.methods.generateAuthToken = async function() {
  const profile = this;

  const token = jwt.sign(
    { _id: profile._id.toString() },
    process.env.JWT_SECRET
  );

  profile.tokens = profile.tokens.concat({ token });
  await profile.save();
  return token;
};
profileSchema.pre("save", async function(next) {
  const profile = this;
  if (profile.isModified("password"))
    profile.password = await bcrypt.hash(profile.password, 8);

  next();
});

profileSchema.pre("remove", async function(next) {
  const profile = this;
  await WishList.deleteMany({ student: profile._id });
  next();
});

const Profiles = mongoose.model("Profiles", profileSchema);

module.exports = Profiles;
