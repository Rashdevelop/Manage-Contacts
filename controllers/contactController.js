const asyncHandler=require("express-async-handler");
const Contact=require("../models/contactsModel");
const getAllContact=asyncHandler(async(req,res)=>{
    const contacts=await Contact.find();
    res.status(200).json({
        contacts,
    })
});
const createContact=asyncHandler(async(req,res)=>{
    const {name, email, phone}=req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("all fields are mandatory");
    }
    const contact=await Contact.create({
        name,
        email,
        phone
    });
    res.status(201).json({
      contact
    });
});
const getContact=asyncHandler(async(req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found");
    }
    res.status(200).json({
        contact,
    });
});
const updateContact=asyncHandler(async(req,res)=>{
    const contact=Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found");
    }
    const updatedContact=await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
        );
    res.status(200).json({
        updatedContact,
    });
});
const deleteContact=asyncHandler(async(req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found");
    }
    await Contact.remove();
    res.status(200).json(contact);
});
module.exports={
    getAllContact,
    createContact,
    getContact,
    updateContact,
    deleteContact
};