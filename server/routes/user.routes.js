const express = require("express");

const { getUserData } = require('../controllers/user.controller')
const { userAuth } = require("../middlewares/userAuth.middleware");
const userRouter = express.Router();

userRouter.post('/data', userAuth, getUserData);
exports.userRouter = userRouter;