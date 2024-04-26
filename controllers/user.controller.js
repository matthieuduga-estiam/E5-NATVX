// Import libraries
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Import model
import User from "../models/user.model.js";

// Login a user
export const login = async (req, res) => {

  try {
    const model = await User.findOne({ email: req.body.email });
    if (!model) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      model.password
    );
    if (!passwordIsValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    if(model.expoPushToken !== req.body.expoPushToken) {
      model.expoPushToken = req.body.expoPushToken;
      await model.save();
    }

    res.status(200).json({
      id: model._id,
      jwt: jwt.sign({ id: model._id }, process.env.JWT_SECRET, {
        expiresIn: 86400, // 24 hours
      }),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Verify token
export const verifyToken = async (req, res) => {
  try {
    const model = await User.findById(req.user.id);
    res.status(200).json(model);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Create a new user
export const create = async (req, res) => {
  var hashPassword = bcrypt.hashSync(req.body.password, 10);

  var model = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashPassword,
    phone: req.body.phone,
    expoPushToken: req.body.expoPushToken,
  });

  try {
    const newUser = await model.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Retrieve all users
export const findAll = async (req, res) => {
  try {
    const models = await User.find();
    res.status(200).json(models);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Retrieve a single user with id
export const findOne = async (req, res) => {
  try {
    const model = await User.findById(req.params.id);
    res.status(200).json(model);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Update a user with id
export const update = async (req, res) => {
  try {
    const model = await User.findById(req.user.id);

    if(req.body.username) model.username = req.body.username;
    if(req.body.firstName) model.firstName = req.body.firstName;
    if(req.body.lastName) model.lastName = req.body.lastName;
    if(req.body.phone) model.phone = req.body.phone;
    if(req.body.address) model.address = req.body.address;
    if(req.body.city) model.city = req.body.city;
    if(req.body.zipCode) model.zipCode = req.body.zipCode;
    if(req.body.country) model.country = req.body.country;
    if(req.body.expoPushToken) model.expoPushToken = req.body.expoPushToken;

    await model.save();
    res.status(200).json(model);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Delete a user with id
export const remove = async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Profile of a user
export const profile = async (req, res) => {
  try {
    const model = await User.findById(req.user.id);
    res.status(200).json(model);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
