const express = require("express");
const router = express.Router();
const { Dorms } = require("../models");

router.get("/", async (req, res) => {
    const listOfDorms = await Dorms.findAll();
    res.json(listOfDorms);
});

router.get("/byId/:id", async (req, res) => {
    const id = req.params.id;
    const dorm = await Dorms.findByPk(id);
    res.json(dorm);
})


router.post("/", async (req, res) => {
    const dorm = req.body;
    await Dorms.create(dorm);
    res.json(dorm);
});

module.exports = router;