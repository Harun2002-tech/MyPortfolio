const express = require("express");
const router = express.Router();
// Controller-ሁ በትክክለኛው path መኖሩን አረጋግጥ
const { saveContact } = require("../controllers/contactController");

// POST request ወደ /api/contact ሲመጣ saveContact-ን ይጠራል
router.post("/contact", saveContact);

module.exports = router;
