const express = require("express");
const WishList = require("../models/wishlist");
const Courses = require("../models/courses");
const Profiles = require("../models/profiles");
const routes = express.Router();
const auth = require("../midleware/auth");

routes.post("/wishlist", auth, async (req, res) => {
  try {
    const courseName = await Courses.findByCredentials(req.body.name);
    const courselist = await new WishList({
      ...req.body,
      student: req.profile._id,
      course: courseName._id
    }).save();
    res.send({ courselist, success: true });
  } catch (e) {
    res.send({ e, success: false });
  }
});

routes.get("/wishlist/:_id", auth, async (req, res) => {
  const _id = req.params._id;
  try {
    const wish = await WishList.findOne({ _id, student: req.profile._id });
    if (!wish) {
      res.status(404).send("No Wish list found");
    }

    await wish.populate("student").execPopulate();
    res.send(wish);
  } catch (e) {
    res.status(500).send(e);
  }
});
routes.get("/searchwishlist", async (req, res) => {
  try {
    const {
      isEnrolledByStudent,
      isEnrolled,
      name,
      email,
      contact,
      country,
      age,
      gender,
      Cname,
      fees,
      isTeacher
    } = req.query;

    const wishes = await WishList.find({
      isEnrolled: isEnrolled,
      isEnrolledByStudent: isEnrolledByStudent
    })
      .populate({
        path: "student",

        match: {
          $and: [
            { name: { $regex: `${name}`, $options: "i" } },
            { email: { $regex: `${email}`, $options: "i" } },
            { contact: { $regex: `${contact}`, $options: "i" } },
            { country: { $regex: `${country}`, $options: "i" } },
            { age: { $regex: `${age}`, $options: "i" } },
            { gender: { $regex: `${gender}`, $options: "i" } }
          ],
          isTeacher: isTeacher
        }
      })
      .populate({
        path: "course",
        match: {
          $and: [
            { name: { $regex: `${Cname}`, $options: "i" } },
            { price: { $regex: `${fees}`, $options: "i" } }
          ]
        }
      });

    if (!wishes) {
      res.send({ error: "Courses not found", success: false });
    }

    res.send({ wishes, success: true });
  } catch (e) {
    res.send({ error: "Courses not found", success: false });
  }
});
routes.get("/enrolledwishlists", auth, async (req, res) => {
  try {
    const {
      isEnrolledByStudent,
      isEnrolled,
      limit,
      skip,
      isTeacher
    } = req.query;

    const wishes = await WishList.find({
      student: req.profile._id,
      isEnrolled: isEnrolled,
      isEnrolledByStudent: isEnrolledByStudent
    })
      .populate({
        path: "course"
      })
      .populate({ path: "student", match: { isTeacher: isTeacher } })
      .setOptions({
        skip: parseInt(skip),
        limit: parseInt(limit)
      });

    if (!wishes) {
      res.send({ error: "Courses not found", success: false });
    }

    res.send({ wishes, success: true });
  } catch (e) {
    res.send({ error: "Courses not found", success: false });
  }
});
routes.get("/enrolledcourselists/:_id", async (req, res) => {
  try {
    const { isEnrolled, limit, skip, isTeacher } = req.query;

    const wishes = await WishList.find({
      course: req.params._id,
      isEnrolled: isEnrolled
    })
      .populate({
        path: "course"
      })
      .populate({ path: "student", match: { isTeacher: isTeacher } })
      .setOptions({
        skip: parseInt(skip),
        limit: parseInt(limit)
      });

    if (!wishes) {
      res.send({ error: "Courses not found", success: false });
    }

    res.send({ wishes, success: true });
  } catch (e) {
    res.send({ error: "Courses not found", success: false });
  }
});
routes.get("/searchenrolledcourselists/:_id", async (req, res) => {
  try {
    const {
      isEnrolled,
      limit,
      skip,
      isTeacher,
      name,
      email,
      age,
      contact,
      country,
      gender
    } = req.query;

    const wishes = await WishList.find({
      course: req.params._id,
      isEnrolled: isEnrolled
    })
      .populate({
        path: "course"
      })
      .populate({
        path: "student",
        match: {
          isTeacher: isTeacher,
          $and: [
            { name: { $regex: `${name}`, $options: "i" } },
            { email: { $regex: `${email}`, $options: "i" } },
            { contact: { $regex: `${contact}`, $options: "i" } },
            { country: { $regex: `${country}`, $options: "i" } },
            { age: { $regex: `${age}`, $options: "i" } },
            { gender: { $regex: `${gender}`, $options: "i" } }
          ]
        }
      })
      .setOptions({
        skip: parseInt(skip),
        limit: parseInt(limit)
      });

    if (!wishes) {
      res.send({ error: "Courses not found", success: false });
    }

    res.send({ wishes, success: true });
  } catch (e) {
    res.send({ error: "Courses not found", success: false });
  }
});
routes.get("/searchenrolledwishlists", auth, async (req, res) => {
  try {
    const {
      isEnrolledByStudent,
      isEnrolled,
      limit,
      skip,
      isTeacher,
      name
    } = req.query;

    const wishes = await WishList.find({
      student: req.profile._id,
      isEnrolled: isEnrolled,
      isEnrolledByStudent: isEnrolledByStudent
    })
      .populate({
        path: "course",
        match: {
          name: { $regex: `${name}`, $options: "i" }
        }
      })
      .populate({ path: "student", match: { isTeacher: isTeacher } })
      .setOptions({
        skip: parseInt(skip),
        limit: parseInt(limit)
      });

    if (!wishes) {
      res.send({ error: "Courses not found", success: false });
    }

    res.send({ wishes, success: true });
  } catch (e) {
    res.send({ error: "Courses not found", success: false });
  }
});
routes.get("/wishlists", async (req, res) => {
  try {
    const {
      isEnrolledByStudent,
      isEnrolled,
      limit,
      skip,
      isTeacher
    } = req.query;

    const wishes = await WishList.find({
      isEnrolled: isEnrolled,
      isEnrolledByStudent: isEnrolledByStudent
    })
      .populate({
        path: "student",
        match: {
          isTeacher: isTeacher
        }
      })

      .populate("course")
      .setOptions({
        skip: parseInt(skip),
        limit: parseInt(limit)
      });

    if (!wishes) {
      res.send({ error: "Courses not found", success: false });
    }

    res.send({ wishes, success: true });
  } catch (e) {
    res.send({ error: "Courses not found", success: false });
  }
});
routes.get("/wishlist", auth, async (req, res) => {
  try {
    const {
      isEnrolledByStudent,
      isEnrolled,
      limit,
      skip,
      sortField,
      order
    } = req.query;

    const match = {};
    if (isEnrolled) {
      match.isEnrolled = isEnrolled === "true";
    }
    const match1 = {};
    if (isEnrolledByStudent) {
      match1.isEnrolledByStudent = isEnrolledByStudent === "true";
    }
    const sort = {};
    if (sortField) {
      sort[sortField] = order === "desc" ? -1 : 1;
    }
    const wishes = await req.profile
      .populate({
        path: "wishlist",
        match,
        match1,
        options: {
          limit: parseInt(limit),
          skip: parseInt(skip),
          sort
        }
      })
      .execPopulate();

    if (!wishes) {
      res.send({ error: "Courses not found", success: false });
    }
    res.send({ wishes, success: true });
  } catch (e) {
    res.send({ error: "Courses not found", success: false });
  }
});

routes.patch("/wishlist/:_id", auth, async (req, res) => {
  const modifiedWish = req.body;
  const fieldsToUpdate = Object.keys(modifiedWish);
  const fieldsInModel = ["isEnrolled", "isEnrolledByStudent"];
  const isUpdateAllowed = fieldsToUpdate.every(field =>
    fieldsInModel.includes(field)
  );
  if (!isUpdateAllowed) {
    return res.status(400).send({ error: "Invalid Fields!" });
  }
  try {
    const wish = await WishList.findOne({
      _id: req.params._id,
      student: req.profile._id
    });
    if (!wish) {
      return res.status(404).send(e);
    }

    Object.assign(wish, modifiedWish);
    await wish.save();
    res.send(wish);
  } catch (e) {
    res.status(500).send(e);
  }
});
routes.patch("/wishlists/:_id", async (req, res) => {
  const modifiedWish = req.body;
  const fieldsToUpdate = Object.keys(modifiedWish);
  const fieldsInModel = ["isEnrolled", "isEnrolledByStudent"];
  const isUpdateAllowed = fieldsToUpdate.every(field =>
    fieldsInModel.includes(field)
  );
  if (!isUpdateAllowed) {
    return res.send({ error: "Invalid Fields!", success: false });
  }
  try {
    const wish = await WishList.findById({
      _id: req.params._id
    });
    if (!wish) {
      return res.send({ error: "not enrolled", success: false });
    }

    Object.assign(wish, modifiedWish);
    await wish.save();
    res.send({ wish, success: true });
  } catch (e) {
    res.send({ error: "not enrolled", success: false });
  }
});
routes.delete("/wishlist/:_id", auth, async (req, res) => {
  try {
    const wish = await WishList.findOneAndDelete({
      _id: req.params._id,
      student: req.profile._id
    });
    if (!wish) {
      res.status(404).send("Wish List not found");
    }
    res.send(wish);
  } catch (e) {
    res.status(500).send(e);
  }
});
module.exports = routes;
