const getAllContact=(req,res)=>{
    res.status(200).json({
        message:"get all contacts"
    })
}
const createContact=(req,res)=>{
    const {name, email, number}=req.body;
    if(!name || !email || !number){
        res.status(400);
        throw new Error("all fields are mandatory");
    }
    res.status(201).json({
        message:"create contact"
    })
}
const getContact=(req,res)=>{
    res.status(200).json({
        message:`get contact for ${req.params.id}`
    });
}
const updateContact=(req,res)=>{
    res.status(200).json({
        message:`update contact for ${req.params.id}`
    });
}
const deleteContact=(req,res)=>{
    res.status(200).json({
        message:`delted contact for ${req.params.id}`
    });
}
module.exports={
    getAllContact,
    createContact,
    getContact,
    updateContact,
    deleteContact};