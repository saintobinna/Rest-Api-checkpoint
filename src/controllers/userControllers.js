// This is a file to create all our endpoint controller functions
import User from "../models/userModel.js";

const createUser = async (req, res) => {
  console.log(req.body);
  const { name, age, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    res.status(400).json({
      message: "password do not match",
    });
    return;
  }

  const userExists = await User.findOne({ email: email });

  if (userExists) {
    res.status(400).json({
      message: "user already exists",
    });
    return;
  }

  console.log(name, email, password);

  await User.create({
    fullname: name,
    email: email,
    age: age,
    password: password,
  });
  res.status(201).json({ message: "user created" });
};

const getUser = async (req, res) => {
  const users = await User.find({}).lean();

  // these method of mapping is used to remove data that you woundn't want to be visible on your database
  // .lean is only used to restrict extra data and provide only the needed document
  const usersData = users.map((eachUser) => {
    const { password, ...restUsers } = eachUser;
    return restUsers;
  });
  await User.create({
    fullname: name,
    email: email,
    age: age,
    password: password,
  });
  res.status(201).json({ message: "user created" });
};

const getUserById = async (req, res) => {
  const users = await User.findById("65e74748d66fb9ff4c3f307b");

  res.status(201).json({ users: usersData });
};
// userController.js

// Assuming you have a User model imported here
// const User = require('../models/User');

// Controller function to delete a user based on query parameters
const deleteUser = async (req, res) => {
  try {
    const query = req.query;

    // Check if required query parameters are present
    if (!query || !query.email) {
      return res.status(400).json({ message: "Email parameter is required" });
    }

    // Logic to find and delete the user by email
    const user = await User.findOneAndDelete({ email: query.email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// module.exports = {
//   deleteUser,
// };

export { createUser, getUser, getUserById, deleteUser };
