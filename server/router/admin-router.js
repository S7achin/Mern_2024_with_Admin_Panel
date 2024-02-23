const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");

// router.route("/").get(adminController.home);
router.route("/users").get(authMiddleware, adminMiddleware, adminController.getAllUsers);

router.route("/users/:id").get(authMiddleware, adminMiddleware, adminController.getUserById);

router.route("/users/update/:id").patch(authMiddleware, adminMiddleware, adminController.updateUserById);

router.route("/users/delete/:id").delete(authMiddleware, adminMiddleware, adminController.deleteUserById);


router.route("/contacts").get(authMiddleware, adminMiddleware, adminController.getAllContacts);

router.route("/contacts/delete/:id/:messageId/:length").delete(authMiddleware, adminMiddleware, adminController.deleteContactById);


router.route("/services").get(authMiddleware, adminMiddleware, adminController.getAllServices);

router.route("/services/delete/:id").delete(authMiddleware, adminMiddleware, adminController.deleteServiceById);

router.route("/services/addservice/").post(authMiddleware, adminMiddleware, adminController.addService);





module.exports = router;