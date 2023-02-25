const express = require("express");
const router = express.Router();

const Blogs = require("../models/Blogs");

// get all blogs
router.get("/", (req, res) => {
  Blogs.find({}, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        result: data,
        message: "Blogs found successfully!",
      });
    }
  });
});

// get a blog by id
router.get("/:id", (req, res) => {
  Blogs.findById({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error",
      });
    } else {
      res.status(200).json({
        result: data,
        message: "Blog found by id successfully!",
      });
    }
  });
});

// post a blog
router.post("/", async (req, res) => {
  let newBlog = new Blogs(req.body);
  await newBlog.save((err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      return res
        .status(200)
        .json({ newBlog, message: "Blog was inserted successfully!" });
    }
  });
});

// put blog by id
router.put("/:id", async (req, res) => {
  try {
    const result = await Blogs.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          author: req.body.author,
          headline: req.body.headline,
          body: req.body.body,
          image: req.body.image,
        },
      },
      { new: true }
    );
    res.status(200).json({ message: "Blog was updated successfully!" });
    console.log(result);
  } catch (error) {
    res.status(500).json({
      error: "There was a server side error!",
    });
  }
});

// delete a blog by id
router.delete("/:id", (req, res) => {
  Blogs.findByIdAndDelete(req.params.id, (err, data) => {
    if (!err) {
      res.status(200).json({
        result: data,
        message: "Blog delete successfully!",
      });
    } else {
      res.status(500).json({
        error: "There was a server side error!",
      });
    }
  });
});

module.exports = router;
