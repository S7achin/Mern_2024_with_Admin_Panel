const Contact = require("../models/contact-model");
const Service = require("../models/service-model");
const User = require("../models/user-model");

const getAllUsers = async(req,res,next)=>{
    try {
        const users = await User.find({},{password:0});
        if(!users || users.length === 0){
            return res.status(201).json({message: "Users not Found"});
        }
        return res.status(201).json(users);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const getAllContacts = async(req,res,next)=>{
    try {
        const contacts = await Contact.find();
        if(!contacts || contacts.length === 0){
            return res.status(401).json({message: "Contacts not Found"});
        }
        return res.status(201).json(contacts)
    } catch (error) {
        next(error);
    }

}

const getAllServices = async(req,res,next)=>{
    try {
        const services = await Service.find();
        if(!services || services.length === 0){
            return res.status(401).json({message: "Services not Found"});
        }
        return res.status(201).json(services);
    } catch (error) {
        next(error);
    }
}

const deleteUserById = async(req,res,next)=>{
    try {
        const id = req.params.id;
        const deletedUser = await User.deleteOne({_id:id});
        // console.log(deletedUser);
        res.status(200).json({message: "User Deleted SuccessFully"});
    } catch (error) {
        next(error);
    }
}

const getUserById = async(req,res,next)=>{
    try {
        const id = req.params.id;
        const user = await User.findOne({_id: id},{password:0});
        // console.log("User for updation ",user);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

const updateUserById = async(req,res,next)=>{
    try {
        const id = req.params.id;
        const updatedUserData = req.body;

        const updatedData = await User.updateOne({_id:id},{
            $set: updatedUserData,
        });
        
        // console.log(updatedData);
        return res.status(200).json(updatedData);
    } catch (error) {
        next(error);
    }
}

const deleteContactById = async(req,res,next) =>{
    try {
        const id = req.params.id;
        const messageId = req.params.messageId;
        const messages = req.params.length;

        if(messages == 1){
            const deletedUser = await Contact.deleteOne({_id:id});
            console.log(deletedUser);
            return res.status(200).json({message: "Contact Deleted SuccessFully"});
        }
        else{
            const result = await Contact.updateOne({ _id: id }, { $pull: { messages: { _id: messageId } } });

            
            if (result.modifiedCount === 1) {
                res.status(200).json({message: "Message Deleted SuccessFully"});
            // console.log(`Message with ID ${messageId} deleted successfully.`);
            } 
            else {
                res.status(401).json({message: "Message not Deleted SuccessFully"});
            //    console.warn(`No message found with ID ${messageId} in collection`);
            }
        }

    } catch (error) {
        next(error);
    }
}

const deleteServiceById = async(req,res,next)=>{
    try {
        const id = req.params.id;
        const deletedService = await Service.deleteOne({_id:id});
        res.status(200).json({message: "Service Deleted SuccessFully"});
    } catch (error) {
        next(error);
    }
}

const addService = async(req,res,next)=>{
    try {
        const {provider, price, service, description} = req.body;

        const serviceCreated = await Service.create({provider, price, service, description});

        res.status(201).json({
            message: "Service Add Successfull", 
        });

    } catch (error) {
        next(error);
    }
    
}


module.exports = {getAllUsers, getAllContacts, getAllServices, deleteUserById, getUserById, updateUserById, deleteContactById, deleteServiceById , addService};