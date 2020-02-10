const express = require("express");
const Profiles = require("../models/profiles");
const routes = express.Router();
const auth = require("../midleware/auth");
const { sendPasswordEmail } = require("../emails/profiles-email");

routes.post("/profiles", async (req, res) => {
  try {
    const profile = await Profiles(req.body).save();
    const token = await profile.generateAuthToken();

    res.send({ success: true, profile, token });
  } catch (e) {
    res.send({ message: "This Email Already Exists", success: false });
  }
});

routes.get("/searchprofiles", async (req, res) => {
  try {
    const nameQ = req.query.name;
    const emailQ = req.query.email;
    const ageQ = req.query.age;
    const contactQ = req.query.contact;
    const countryQ = req.query.country;
    const isTeacherQ = req.query.isTeacher;

    const genderQ = req.query.gender;

    const profiles = await Profiles.find({
      isTeacher: isTeacherQ,
      $and: [
        { name: { $regex: `${nameQ}`, $options: "i" } },
        { email: { $regex: `${emailQ}`, $options: "i" } },
        { contact: { $regex: `${contactQ}`, $options: "i" } },
        { country: { $regex: `${countryQ}`, $options: "i" } },
        { age: { $regex: `${ageQ}`, $options: "i" } },
        { gender: { $regex: `${genderQ}`, $options: "i" } }
      ]
    });

    if (!profiles) {
      return res.send({ error: "Profiles Not Found", success: false });
    }
    res.send({ profiles, success: true });
  } catch (e) {
    res.send({ error: "Profiles Not Found", success: false });
  }
});
routes.get("/profiless", async (req, res) => {
  try {
    const { isTeacher, limit, skip } = req.query;

    const profiles = await Profiles.find({
      isTeacher: isTeacher
    }).setOptions({
      skip: parseInt(skip),
      limit: parseInt(limit)
    });

    if (!profiles) {
      res.send({ error: "Profiles not found", success: false });
    }

    res.send({ profiles, success: true });
  } catch (e) {
    res.send({ error: "Profiles not found", success: false });
  }
});

routes.get("/profiles", async (req, res) => {
  try {
    const profiles = await Profiles.find({});

    if (!profiles) {
      return res.send({ error: "No Students Found", success: false });
    }
    res.send({ profiles, success: true });
  } catch (e) {
    res.send({ error: "No Students Found", success: false });
  }
});

routes.get("/profiles/myprofile", auth, async (req, res) => {
  try {
    const profile = req.profile;

    await profile.populate("wishlist").execPopulate();
    res.send({
      id: profile._id,
      name: profile.name,
      email: profile.email,
      age: profile.age,
      contact: profile.contact,
      country: profile.country,
      password: profile.password,
      isAdmin: profile.isAdmin,
      isTeacher: profile.isTeacher,
      gender: profile.gender,
      success: true
    });
  } catch (e) {
    res.send({ e, success: false });
  }
});
routes.patch("/profiles/myprofiles/:_id", async (req, res, next) => {
  const changedProfile = req.body;
  const fieldsToUpdate = Object.keys(changedProfile);
  const fieldsInModel = ["isTeacher"];
  const isUpdateAllowed = fieldsToUpdate.every(field =>
    fieldsInModel.includes(field)
  );
  if (!isUpdateAllowed) {
    return res.send({ error: "Invalid fields!" });
  }
  try {
    const profile = await Profiles.findById({ _id: req.params._id });
    Object.assign(profile, changedProfile);
    await profile.save();
    res.send({ profile, success: true });
  } catch (e) {
    res.status(500).send({ e, success: false });
  }
});
routes.patch("/profiles/myprofile", auth, async (req, res, next) => {
  const changedProfile = req.body;
  const fieldsToUpdate = Object.keys(changedProfile);
  const fieldsInModel = [
    "name",
    "email",
    "country",
    "age",
    "contact",
    "gender",
    "password",
    "isAdmin",
    "isTeacher"
  ];
  const isUpdateAllowed = fieldsToUpdate.every(field =>
    fieldsInModel.includes(field)
  );
  if (!isUpdateAllowed) {
    return res.send({ error: "Invalid fields!" });
  }
  try {
    const profile = req.profile;
    Object.assign(profile, changedProfile);
    await profile.save();
    res.send({ profile, success: true });
  } catch (e) {
    res.status(500).send({ e, success: false });
  }
});
routes.post("/profiles/message", async (req, res) => {
  try {
    const { message, name, email } = req.body;

    const profile = await Profiles.findOne({ isAdmin: true });

    profile.messages = profile.messages.concat({
      name: name,
      message: message,
      email: email
    });

    await profile.save();

    res.send({ profile, success: true });
  } catch (e) {
    res.send({ e, success: false });
  }
});
routes.get("/profiles/messages", async (req, res) => {
  try {
    const profile = await Profiles.findOne({ isAdmin: true });

    await profile.save();

    res.send({ file: profile.messages, success: true });
  } catch (e) {
    res.send({ e, success: false });
  }
});
routes.post("/profiles/myprofile/checkOldPass", auth, async (req, res) => {
  try {
    const profile = await Profiles.findByCredentials(
      req.body.email,
      req.body.password
    );

    res.send({ profile, success: true });
  } catch (e) {
    res.send({ e, success: false });
  }
});
routes.delete("/profiles/myprofiles/:_id", async (req, res) => {
  try {
    const profile = await Profiles.findById({ _id: req.params._id });
    await profile.remove();
    res.send({ profile, success: true });
  } catch (e) {
    res.send({ error: "Student Not Deleted", success: false });
  }
});

routes.post("/profiles/login", async (req, res) => {
  try {
    const profile = await Profiles.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await profile.generateAuthToken();
    res.status(201).send({ profile, token, success: true });
  } catch (e) {
    res.send({ e, success: false, error: "Email or Password Incorrect" });
  }
});
routes.post("/profiles/resetpassword", async (req, res) => {
  try {
    const profile = await Profiles.findByCredentialsEmail(req.body.email);

    const token = await profile.generateAuthToken();
    sendPasswordEmail(profile.name, req.body.email, token);
    res.status(201).send({ profile, token, success: true });
  } catch (e) {
    res.send({ e, success: false, error: "Email Not Exists" });
  }
});
routes.post("/profiles/logout", auth, async (req, res) => {
  try {
    const { profile, token } = req;
    profile.tokens = profile.tokens.filter(t => t.token !== token);
    await profile.save();
    res.send({ profile, success: true });
  } catch (e) {
    res.send({ e, success: false, error: "You are already logged out" });
  }
});
routes.get("/profiles/login", auth, async (req, res) => {
  try {
    res.send({ profile: req.profile, success: true });
  } catch (e) {
    res.send({ success: false, e });
  }
});

module.exports = routes;
