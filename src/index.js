const express = require("express");
const profileRoutes = require("./profile-routes/profile-routes");
const wishlistRoutes = require("./profile-routes/wishlist-routes");
const courseRoutes = require("./profile-routes/course-routes");
const path = require("path");
require("./db/mongoose");

const app = express();

app.use(express.json());
app.use(profileRoutes);
app.use(wishlistRoutes);
app.use(courseRoutes);

if (process.env.NODE_ENV === "production") {
  //Set Static Folder
  app.use(express.static("online-quran/build"));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "online-quran", "build", "index.html")
    );
  });
}

const port = process.env.PORT;

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
