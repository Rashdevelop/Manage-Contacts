const express=require("express");
const {getAllContact,createContact,getContact,updateContact,deleteContact} =require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");
const router=express.Router();
router.use(validateToken);
router.route("/").get(getAllContact).post(createContact);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

module.exports=router