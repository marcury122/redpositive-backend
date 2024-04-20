const express = require("express");
const {
  addUser,
  updateUser,
  getAllUsers,
  deleteUser,
} = require("../controllers/userController");
// const userController = require('../controllers/userController.js');
const userRouter = express.Router();

// Get all data
const getAllUserRoute = userRouter.get("/", getAllUsers);

// Add new data
const addUserRoute = userRouter.post("/addData", addUser);

// Update data by ID
const updateUserRoute = userRouter.put("/updateData/:id", updateUser);

// Delete data by ID
const deleteUserRoute = userRouter.delete("/:id", deleteUser);

// Send data to email
// router.post('/send-email', dataController.sendEmail);

// module.exports = ;
module.exports = {
  userRouter,
  addUserRoute,
  updateUserRoute,
  getAllUserRoute,
  deleteUserRoute,
};
