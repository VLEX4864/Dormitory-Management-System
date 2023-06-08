const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");

const { sign } = require('jsonwebtoken');


router.post("/", async (req, res) => {
    const { username, password, role, firstname, lastname, email, cnp, faculty, programe, degree, year } = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        Users.create({
            username: username,
            password: hash,
            role: role,
            firstname: firstname,
            lastname: lastname,
            email: email,
            cnp: cnp,
            faculty: faculty,
            programe: programe,
            degree: degree,
            year: year
        });
        res.json("Success")
    });
});


router.post("/login", async (req, res) => {
    const { username, password, role, firstname, lastname, email, cnp, faculty, programe, degree, year } = req.body;

    const user = await Users.findOne({ where: { username: username } });

    if (!user) {
        res.json({ error: "User Doesn't Exist" });
    } else {
        bcrypt.compare(password, user.password).then((match) => {
            if (!match) {
                res.json({ error: "Wrong Username And Password Combination" });
            } else {
                const accessToken = sign({ username: user.username, id: used.id },)
                res.json("YOU LOGGED IN!!!");
            }
        });
    }


});


module.exports = router;