const express = require("express");
const router = express.Router();
const contactForm = require("../controllers/contact-controller")
const validate = require("../middlewares/validate-middleware");
const schema = require("../validators/auth-validator");


router.route('/contact').post(validate(schema.contactSchema),contactForm);

module.exports = router;