const express = require("express");
const UserModel = require("./user.model");
const ToDoModel = require("./todo.model");
const bcrypt = require("bcryptjs");
const router = express.Router();
const jwt = require("jsonwebtoken");

//Register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const oldUSer = await UserModel.findOne({ email });
    if (oldUSer)
      return res.status(400).json({ message: "User already exist!" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    res
      .status(201)
      .json({ sucess: true, message: "Registered successfully!", result });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const oldUser = await UserModel.findOne({ email });
    if (!oldUser) return res.status(404).send("User not found!");

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "wrong password" });

    const token = jwt.sign(
      { email: oldUser.email, id: oldUser._id },
      "secret",
      { expiresIn: "11h" }
    );

    res.status(200).json({ oldUser, token });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
});

//Create todo
router.post("/create-todo", async (req, res) => {
  const { content } = req.body;
  try {
    const todo = new ToDoModel({ content });
    todo.save();

    res.status(201).send(todo);
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
});

//GEt all todo
router.get("/todos", async (req, res) => {
  try {
    const todos = await ToDoModel.find({});
    res.status(200).send(todos);
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
});

//Update todo
router.put("/todo/:id", async (req, res) => {
  const { content } = req.body;
  try {
    const updatedTodo = await ToDoModel.findByIdAndUpdate(
      req.params.id,
      { content },
      { new: true }
    );
    if (!updatedTodo) return res.status(404);
    res.status(200).send(updatedTodo);
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
});

//Delete todo
router.delete("/todo/:id", async (req, res) => {
  try {
    const deleteTodo = await ToDoModel.findByIdAndDelete(req.params.id);
    res.status(200).send("success");
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
});

module.exports = router;
