const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth-controller");
const validate = require("../middlewares/validate-middleware");
const schema = require("../validators/auth-validator");
const authMiddleware = require("../middlewares/auth-middleware");


router.route('/').get(authControllers.home);
// router.route('/register').get(authControllers.register);
router.route('/register').post(validate(schema.signupSchema),authControllers.register);
router.route('/login').post(validate(schema.loginSchema),authControllers.login);
router.route('/user').get(authMiddleware, authControllers.user);

// router.get('/',(req,res)=>{
//     res.status(200).send("Welcome To MERN 2024");
// })

module.exports = router;