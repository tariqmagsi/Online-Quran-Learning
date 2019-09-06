const express = require("express");
const Courses = require("../models/courses");
const multer = require("multer");
const routes = express.Router();

routes.post("/courses/thiscourseannouncement/:_id", async (req, res) => {
  try {
    const courses = await Courses.findById({ _id: req.params._id });

    courses.announcements = courses.announcements.concat({
      subject: req.body.name,
      message: req.body.link
    });
    await courses.save();
    res.send({ success: true });
  } catch (e) {
    res.send({ success: false });
  }
});
routes.post("/courses/announcedelete/:_id", async (req, res) => {
  try {
    const { id } = req.body;
    const courses = await Courses.findById({ _id: req.params._id });

    courses.announcements = courses.announcements.filter(rec => rec._id != id);
    await courses.save();

    res.send({ file: courses.announcements, success: true });
  } catch (e) {
    res.send({ e, success: false });
  }
});
routes.get("/courses/thiscourse/announcements/:_id", async (req, res) => {
  try {
    const courses = await Courses.findOne({ _id: req.params._id });

    if (!courses) {
      throw new Error();
    }

    res.send({ file: courses.announcements, success: true });
  } catch (e) {
    res.send({ success: false });
  }
});

routes.get("/courses/thiscourse/live/:_id", async (req, res) => {
  try {
    const courses = await Courses.findOne({ "lectures._id": req.params._id });

    const course = courses.lectures.find(rec => {
      return rec._id == req.params._id ? rec.lecture : false;
    });
    if (!courses) {
      throw new Error();
    }

    res.send({ file: course.lecture, success: true });
  } catch (e) {
    res.send({ success: false });
  }
});
routes.post("/courses/livedelete/:_id", async (req, res) => {
  try {
    const { id } = req.body;
    const courses = await Courses.findById({ _id: req.params._id });

    courses.lectures = courses.lectures.filter(rec => rec._id != id);
    await courses.save();

    res.send({ file: courses.lectures, success: true });
  } catch (e) {
    res.send({ e, success: false });
  }
});
routes.get("/courses/thiscourse/lives/:_id", async (req, res) => {
  try {
    const courses = await Courses.findOne({ _id: req.params._id });

    if (!courses) {
      throw new Error();
    }

    res.send({ file: courses.lectures, success: true });
  } catch (e) {
    res.send({ success: false });
  }
});
routes.post("/courses/thiscourselive/:_id", async (req, res) => {
  try {
    const courses = await Courses.findById({ _id: req.params._id });

    courses.lectures = courses.lectures.concat({
      name: req.body.name,
      lecture: req.body.link
    });
    await courses.save();
    res.send({ success: true });
  } catch (e) {
    res.send({ success: false });
  }
});
routes.post("/courses/filedelete/:_id", async (req, res) => {
  try {
    const { id } = req.body;
    const courses = await Courses.findById({ _id: req.params._id });

    courses.file = courses.file.filter(rec => rec._id != id);
    await courses.save();

    res.send({ file: courses.file, success: true });
  } catch (e) {
    res.send({ e, success: false });
  }
});
routes.get("/courses/thiscourse/file/:_id", async (req, res) => {
  try {
    const courses = await Courses.findOne({ "file._id": req.params._id });

    const course = courses.file.find(rec => {
      return rec._id == req.params._id ? rec.files : false;
    });
    if (!courses) {
      throw new Error();
    }

    res.send({ file: course.files, success: true });
  } catch (e) {
    res.send({ success: false });
  }
});
routes.get("/courses/thiscourse/files/:_id", async (req, res) => {
  try {
    const courses = await Courses.findOne({ _id: req.params._id });

    if (!courses) {
      throw new Error();
    }

    res.send({ file: courses.file, success: true });
  } catch (e) {
    res.send({ success: false });
  }
});
routes.post("/courses/thiscourse/:_id", async (req, res) => {
  try {
    const courses = await Courses.findById({ _id: req.params._id });

    courses.file = courses.file.concat({
      name: req.body.name,
      files: req.body.link
    });
    await courses.save();
    res.send({ success: true });
  } catch (e) {
    res.send({ success: false });
  }
});
routes.post("/courses", async (req, res) => {
  try {
    const courses = await Courses(req.body).save();
    res.send({ courses, success: true });
  } catch (e) {
    res.send({ e, success: false });
  }
});
routes.get("/searchcourse", async (req, res) => {
  try {
    const nameQ = req.query.name;
    const priceQ = req.query.price;

    const courses = await Courses.find({
      $and: [
        { name: { $regex: `${nameQ}`, $options: "i" } },
        { price: { $regex: `${priceQ}`, $options: "i" } }
      ]
    });

    if (!courses) {
      return res.send({ error: "Courses Not Found", success: false });
    }
    res.send({ courses, success: true });
  } catch (e) {
    res.send({ error: "Courses Not Found", success: false });
  }
});
routes.get("/courses", async (req, res) => {
  try {
    const { limit, skip } = req.query;

    const courses = await Courses.find({}).setOptions({
      skip: parseInt(skip),
      limit: parseInt(limit)
    });

    if (!courses) {
      return res.send({ error: "Courses Not Found", success: false });
    }
    res.send({ courses, success: true });
  } catch (e) {
    res.send({ error: "Courses Not Found", success: false });
  }
});

routes.get("/courses/mycourse/:_id", async (req, res) => {
  try {
    const courses = await Courses.findById(req.params._id);
    res.send(courses);
  } catch (e) {
    res.status(500).send(e);
  }
});
routes.patch("/courses/mycourse/:_id", async (req, res) => {
  const changeCourse = req.body;
  const fieldsToUpdate = Object.keys(changeCourse);
  const fieldsInModel = ["name", "price", "description"];
  const isUpdateAllowed = fieldsToUpdate.every(field =>
    fieldsInModel.includes(field)
  );
  if (!isUpdateAllowed) {
    return res.send({ message: "Error Not Found", success: false });
  }
  try {
    const course = await Courses.findOne({
      _id: req.params._id
    });

    if (!course) {
      return res.send({ message: "Error Not Found", success: false });
    }

    Object.assign(course, changeCourse);
    await course.save();
    res.send({ course, success: true });
  } catch (e) {
    res.send({ message: "Error Not Found", success: false });
  }
});
routes.delete("/courses/mycourse/:_id", async (req, res) => {
  try {
    const course = await Courses.findById(req.params._id);

    if (!course) {
      return res.send({ message: "Error Not Found", success: false });
    }

    await course.remove();

    res.send({ course, success: true });
  } catch (e) {
    res.status(404).send({ message: "Error Not Found", success: false });
  }
});
module.exports = routes;
