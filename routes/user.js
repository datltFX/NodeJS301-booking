const express = require("express");
const UserController = require("../controllers/user");
const router = express.Router();
//register
router.post("/register", UserController.postRegisterUser);
//login
router.post("/login", UserController.postLogin);
//create new transaction
router.post("/transaction", UserController.postCreateTransaction);
//get user's transaction
router.get("/transaction/:username", UserController.getTransaction);
module.exports = router;
