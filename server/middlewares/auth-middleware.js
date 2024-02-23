const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const authMiddleware = async (req,res,next)=>{
    const token = req.header("Authorization");

    if(!token){
        return res.status(401).json({message: "Unauthorized HTTP, Token not provided!!!"});
    }
    // console.log("Token from auth-middleware ",token);

    // Assuming token in format "Bearer <jwttoken>" , Removing Bearer prefix;
    const jwtToken = token.replace("Bearer","").trim();
    // console.log("Token from auth-middleware ",jwtToken);

    try {
        const isVerified = jwt.verify(jwtToken,process.env.JWT_SECRET_KEY);
        // console.log(isVarified);

        const userData = await User.findOne({email:isVerified.email}).select({password:0});
        // console.log(userData);

        req.user = userData;
        req.token = token;
        req.userId = userData._id;
        next();
    } catch (error) {
        return res.status(401).json({message: "Unauthorized HTTP, Token not provided!!"});
    }
}

module.exports = authMiddleware;