const express = require("express");
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const {
  categoryById,
  create,
  read,
  update,
  remove,
  list,
} = require("../controllers/category");
const { userById } = require("../controllers/user");
//const { remove } = require("../models/user");

router.get("/category/:categoryId/:userId", read);
router.post("/category/create/:userId", requireSignin, isAuth, isAdmin, create);
router.delete(
  "/category/:categoryId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  remove
);
router.put(
  "/category/:categoryId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  update
);
router.get("/categories/", list);

router.param("userId", userById);
router.param("categoryId", categoryById);

module.exports = router;
