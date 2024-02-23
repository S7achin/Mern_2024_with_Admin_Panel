const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

const home = async (req,res)=>{
    try {
        res.status(200).send("auth-controller from controller");
    } catch (error) {
        console.log(error);
    }
}


const register = async (req,res)=>{
    try {
        const {username, email, phone, password} = req.body;

        const userExist = await User.findOne({email:email});

        if(userExist){
            return res.status(401).json({ message: "Email already Exist, please login!!"});
        }

        // const saltRound = 10;
        // const hash_password = await bcrypt.hash(password, saltRound);
        const userCreated = await User.create({username, email, phone, password});

        res.status(201).json({
            msg: "Registration Successfull", 
            token: await userCreated.generateToken(), 
            userId:userCreated._id.toString()
        });

    } catch (error) {
        res.status(400).send({msg: "page not found"});
    }
    
}

const login = async (req, res)=>{
    try {
        const {email, password} = req.body;
        const userExist = await User.findOne({email:email});

        if(!userExist){
            return res.status(401).json({ message: "Invalid Login Credential !!"});
        }

        // const user = await bcrypt.compare(password, userExist.password);
        const user = await userExist.comparePassword(password);

        if(user){
            return res.status(201).json({
                msg: "Login Successfull", 
                token: await userExist.generateToken(), 
                userId:userExist._id.toString()
            });
        }
        else{
            return res.status(401).json({message: "Invalid Login Credential !!"});
        }

    } catch (error) {
        res.status(400).send({msg: "login page not found"});
    }
}


// To send user Data - user Logic
const user = async (req,res)=>{
    try {
        const userData = req.user;
        // console.log(userData);
        return res.status(200).json({userData});

    } catch (error) {
        console.log(`error from the user route ${error}`);
    }
}

module.exports = { home, register, login, user};