const userSchema = require("../models/userSchema.js");
// const emailService = require("../utils/email");

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await userSchema.find();
    res.status(200).json(allUsers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addUser = async (req, res) => {
  const newUser = new userSchema({
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    hobbies: req.body.hobbies,
  });

  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    console.log(req.params.id);
    const updatedUser = await userSchema.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(202).json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// const updateUser = async (req, res) => {
//   console.log(req.body);
//   const updatedData = await userSchema.findByIdAndUpdate(
//     { name: req.params.name },
//     { $set: { hobbies: req.body.hobbies } }
//   );
//   res.send({ status: "updated qqq new" });
// };

const deleteUser = async (req, res) => {
  try {
    await userSchema.findByIdAndDelete(req.params.id);
    res.json({ message: "Data deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// const deleteUser = async (req, res) => {
//   console.log("hoole");
//   console.log(req.params.id);
//   const deletedUser = await userSchema.findByIdAndDelete({ _id: req.params.id });
//   res.send(deletedUser);
// };


module.exports = { getAllUsers, addUser, updateUser, deleteUser };
