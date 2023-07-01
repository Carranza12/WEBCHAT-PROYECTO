const express = require("express");
const router = express.Router();
const path = require("path");

const views = path.join(__dirname + "/../views");

const isLoggedIn = require("../middlewares/isLoggedIn");
const { _queryDocuments } = require("../services/firebase.service");

router.get("/", isLoggedIn, async (req,res) => {
    const data = await _queryDocuments('general_chat', {});
    const settings = {
         data
    }
    res.render(views + "/index", settings);
})

router.get("/register", (req,res) => {
    res.sendFile(views + "/register.html");
})

module.exports = router;