const {Schema,model} = require("mongoose");

const contactSchema = new Schema({
    username: { type: String, require: true},
    email: { type: String, require: true},
    messages:[
        {
            message:{
                type:String,
                required:true
            }

        }
    ],
})

contactSchema.methods.addMessage = async function (message) {
    try {
        this.messages = this.messages.concat({message:message});
        await this.save();
        return this.messages;
    } catch (err) {
        console.log(err);
    }
}

const Contact = new model("Contact", contactSchema);
module.exports = Contact;
