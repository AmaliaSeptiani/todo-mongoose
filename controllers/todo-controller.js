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

  getTodoById: (req, res) => {

  },

  createTodo: async (req, res) => {
    let data = req.body

    await Todo.create(data)

    res.json({
      message: "berhasil membuat data todo"
    })
  },
//   deleteTodo: async (req, res) => {
//     try{
//     const {todoId} = req.params;
//     const todo = await Todo.findById(todoId);
//     if (!todo){
//         return res.status(404).json({message: 'Todo not found'});
//     }
//     await Todo.findByIdAndDelete(todoId);
//     res.json({message: 'Todo deleted successfully'});
//     } catch (errror){
//         console.error(error);
//         res.status(500).json({message: 'Internal server error'});
//     }
// }
}