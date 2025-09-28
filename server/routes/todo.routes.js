const express = require("express");
const router = express.Router();
const {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} = require("../controllers/todo.controller");
const { userAuth } = require("../middlewares/userAuth.middleware");


// Protected routes
router.post("/create", userAuth, createTodo);
router.get("/", userAuth, getTodos);
router.put("/:id", userAuth, updateTodo);
router.delete("/:id", userAuth, deleteTodo);

module.exports = router;
