// Is user admin function - to check user is admin or not


const adminMiddleware  = async(req,res,next)=>{

    try {
        const userData =  req.user;
        // console.log(userData);
        if(!userData.isAdmin){
            return res.status(403).json({message: "Access Denied. User is not an admin!!"})
        }
        next();

    } catch (error) {
        next(error);
    }
    
}

module.exports = adminMiddleware;