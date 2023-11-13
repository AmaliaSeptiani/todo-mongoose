const Todo = require('../models/todo');

module.exports = {
  getAllTodo: async (req, res) => {
    const user = req.user

    const todos = await Todo.find({userID: user.id}).populate("userID", ["_id", "name"])

    res.json({
      message: "berhasil mendapatkan data todo",
      data: todos
    })
  },

  getTodoById: async (req, res) => {
    const { todoId } = req.params;

    try {
      const todo = await Todo.findById(todoId).populate('userID', ['_id', 'name']);

      if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
      }

      res.json({
        message: 'Successfully retrieved todo by ID',
        data: todo,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  createTodo: async (req, res) => {
    let data = req.body

    await Todo.create(data)

    res.json({
      message: "berhasil membuat data todo"
    })
  },
  deleteTodo: async (req, res) => {
    const { todoId } = req.params;

    try {
      
      const todos = await Todo.findById(todoId);
      if (!todos) {
        return res.status(404).json({ message: 'Todo not found' });
      }

    
      await Todo.findByIdAndDelete(todoId);

      res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  updateTodo: async (req, res) => {
    const { todoId } = req.params;
    const newData = req.body;

    try {
      
      const todo = await Todo.findById(todoId);
      if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
      }

      
      await Todo.findByIdAndUpdate(todoId, newData);

      res.json({ message: 'Todo updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  deleteAllTodos: async (req, res) => {
    const user = req.user;

    try {
      
      await Todo.deleteMany({ userID: user.id });

      res.json({ message: 'All todos deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
}