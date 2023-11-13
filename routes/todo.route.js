const express = require("express");
const route = express.Router();

const {
  getAllTodo,
  getTodoById,
  createTodo,
  deleteTodo,
  updateTodo,
  deleteAllTodos
} = require("../controllers/todo-controller");
const verifyToken = require("../middleware/auth");

route.get("/", verifyToken, getAllTodo);
route.get("/:id", getTodoById);
route.post("/", createTodo);
route.delete("/:id", deleteTodo);
route.post(":/id", updateTodo);
route.delete("/", verifyToken, deleteAllTodos);

module.exports = route;