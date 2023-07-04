import express from "express";
import {
  deleteUser,
  updateUser,
  getUser,

} from "../controllers/user.controller.js";
import {verifyUser} from "../middleware/jwt.js"
import { addOrRemove } from "../controllers/user.controller.js";
const router = express.Router();

router.delete('/:id',verifyUser,deleteUser)
router.put('/update/:id',verifyUser,updateUser)
router.get('/find/:id',verifyUser, getUser);
router.put("/addOrRemove/:id",verifyUser, addOrRemove)


export default router;