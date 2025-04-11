const router = require("express").Router();
const Todo = require("../models/todo");
const User = require("../models/user");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  try {
    const todo = new Todo({
      ...req.body,
      user: req.userId,
    });
    await todo.save();

    await User.findByIdAndUpdate(req.userId, { $push: { list: todo._id } });

    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: "Error creating todo" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    // console.log("Fetching todos for user:", req.userId);
    const todos = await Todo.find({ user: req.userId });
    // console.log("Found todos:", todos);
    res.status(200).json(todos);
  } catch (error) {
    console.error("Error in GET /todos:", error);
    res.status(500).json({ message: "Error fetching todos" });
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: "Error updating todo" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting todo" });
  }
});

module.exports = router;
