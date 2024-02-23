const Contact = require("../models/contact-model");

const contactForm = async (req,res)=>{
    try {
        const {username,email,message} = req.body;

        // To check user has already in contact collection
        const userContact = await Contact.findOne({ email });

        // if Yes then append their message to an Array messages
        if(userContact){
            const userMessage = await userContact.addMessage(message);
            await userContact.save();
            res.status(201).json({ message: "Message saved successfully "});
        }
        // if No then create an Array messages from single message
        else{
            const userDataMessage = {
                username : username,
                email : email,
                messages: [{message:message}]
            }
            // console.log(userDataMessage);
            await Contact.create(userDataMessage);
            res.status(201).json({ message: "Message sent Successfull"});
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message : "Message not delivered"});
    }
    
}

module.exports = contactForm;