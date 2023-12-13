import User from '../schema/userschema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Token from '../schema/token.js';

dotenv.config();

export const adduser = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = {
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    phone: req.body.phone,
    password: hashedPassword,
  };

  const newUSer = new User(user);

  try {
    await newUSer.save();
    res.status(201).json(newUSer);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
export const signupUser = async (req, res) => {
  if (
    req.body.name &&
    req.body.username &&
    req.body.email &&
    req.body.phone &&
    req.body.password
  ) {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = {
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      phone: req.body.phone,
      password: hashedPassword,
    };

    const newUSer = new User(user);
    try {
      await newUSer.save();
      return res.status(201).json({ newUSer, isSuccess: true });
    } catch (err) {
      return res.status(409).json({ message: err.message, isSuccess: false });
    }
  } else {
    return res.status(409).json({ message: 'All fields are mandatory.' });
  }
};

export const loginUser = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ message: 'Please first signup.' });
  }
  try {
    let match = await bcrypt.compare(req.body.password, user.password);
    if (match) {
      const accessToken = jwt.sign(
        user.toJSON(),
        process.env.ACCESS_TOKEN_SECRET_KEY
      );
      const refreshToken = jwt.sign(
        user.toJSON(),
        process.env.REFRESH_TOKEN_SECRET_KEY
      );
      const newToken = new Token({ token: refreshToken });
      await newToken.save();
      return res.status(200).json({
        accessToken: accessToken,
        refreshToken: refreshToken,
        id: user._id,
        email: user.email,
        isSuccess: true,
      });
    } else {
      return res
        .status(400)
        .json({ message: 'Password entered is invalid.', isSuccess: false });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message, isSuccess: false });
  }
};
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const editUser = async (req, res) => {
  let user = req.body;
  const editUser = new User(user);
  try {
    await User.updateOne({ _id: req.params.id }, editUser);
    res.status(201).json(editUser);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
export const deleteUSer = async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
