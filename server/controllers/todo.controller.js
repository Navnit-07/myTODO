const Todo = require("../models/todo.model");

// @desc Add a new Todo
// @route POST /api/todos
exports.createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.userId;

    if (!title || title.trim().length < 3) {
      return res.status(400).json({
        success: false,
        message: "Title must be at least 3 characters long",
      });
    }

    const todo = await Todo.create({ userId, title, description });

    return res.status(201).json({
      success: true,
      message: "Todo created successfully",
      data: todo,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get all Todos of logged-in user
// @route GET /api/todos
exports.getTodos = async (req, res) => {
  try {
    const userId = req.userId;
    const todos = await Todo.find({ userId }).sort({ createdAt: -1 });

    return res.status(200).json({ success: true, data: todos });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Update a Todo
// @route PUT /api/todos/:id
exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    const { userId } = req;

    const todo = await Todo.findOne({ _id: id, userId });
    if (!todo) {
      return res.status(404).json({ success: false, message: "Todo not found" });
    }

    if (title && title.trim().length < 3) {
      return res.status(400).json({
        success: false,
        message: "Title must be at least 3 characters long",
      });
    }

    todo.title = title ?? todo.title;
    todo.description = description ?? todo.description;
    todo.completed = completed ?? todo.completed;

    await todo.save();

    return res
      .status(200)
      .json({ success: true, message: "Todo updated", data: todo });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Delete a Todo
// @route DELETE /api/todos/:id
exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const todo = await Todo.findOne({ _id: id, userId });
    if (!todo) {
      return res.status(404).json({ success: false, message: "Todo not found" });
    }

    await todo.deleteOne();

    return res.status(200).json({ success: true, message: "Todo deleted" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
