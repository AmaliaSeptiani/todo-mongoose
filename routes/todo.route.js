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
route.get("/:todoId", getTodoById);
route.post("/", createTodo);
// yg / di atas dr /:id
route.delete("/", verifyToken, deleteAllTodos);
route.delete("/:todoId", deleteTodo);
route.post("/:todoId", updateTodo);

module.exports = route;