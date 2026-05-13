const Contact = require("../models/Contact"); // የፈጠርነውን የ Mongoose Model ይጠራል

const insertContact = async (data) => {
  const { fullName, email, mobile, subject, message } = data;

  // MongoDB ውስጥ ዳታውን ለመጨመር
  const newContact = new Contact({
    fullName,
    email,
    mobile,
    subject,
    message
  });

  const result = await newContact.save();
  return result;
};

module.exports = { insertContact };