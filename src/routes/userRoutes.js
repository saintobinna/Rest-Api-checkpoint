import express from "express";
import {
  createUser,
  getUser,
  getUserById,
  deleteUser,
} from "../controllers/userControllers.js";

const router = express.Router();

router.post("/create-user", createUser);
router.get("/get-user", getUser);
router.put("/get-user", getUserById);
router.delete("/get-user", deleteUser);

export default router;
// userRoutes.js
