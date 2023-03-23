const express = require("express");
const router = express.Router();
const { Dorms } = require("../models");

router.get("/", async (req, res) => {
    const listOfDorms = await Dorms.findAll();
    res.json(listOfDorms);
});

router.post("/", async (req, res) => {
    const dorm = req.body;
    await Dorms.create(dorm);
    res.json(dorm);
});

module.exports = router;