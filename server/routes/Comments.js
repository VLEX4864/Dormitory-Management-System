const express = require("express");
const router = express.Router();
const { Comments } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware")

router.get("/:dormId", async (req, res) => {
    const dormId = req.params.dormId;
    const comments = await Comments.findAll({ where: { DormId: dormId } });
    res.json(comments);
});

router.post("/", validateToken, async (req, res) => {
    const comment = req.body;
    const username = req.user.username;
    comment.user = username;
    await Comments.create(comment);
    res.json(comment);
});

module.exports = router;