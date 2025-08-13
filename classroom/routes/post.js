const express = require("express");
const router = express.Router();

//Index -post
router.get("/", (req, res) =>{
    res.send("Get for post");
});

//Show -post
router.get("/:id", (req, res) =>{
    res.send("Get for post id");
});

//POST -post
router.post("/", (req, res) =>{
    res.send("Post for post");
});

//Delete -post
router.delete("/:id", (req, res) =>{
    res.send("Delete for post id");
});

module.exports = router;