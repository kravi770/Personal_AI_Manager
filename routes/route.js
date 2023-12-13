import express from 'express';

import {
  adduser,
  getUsers,
  getUser,
  editUser,
  deleteUSer,
  signupUser,
  loginUser,
  // authenticateJWT,
} from '../controller/usercontroller.js';

const router = express.Router();

router.post('/add', adduser);
router.post('/signup', signupUser);
router.get('/admin/all', getUsers); //////////////////
router.get('/:id', getUser);
router.put('/admin/:id', editUser);
router.delete('/:id', deleteUSer);
router.post('/login', loginUser);
// router.post('/:id', findInChatGPT);

export default router;
