
const validate = (schema)=> async(req,res,next)=>{
    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next();
    } catch (err) {
        const status = err.status;
        const message = "Fill the Details properly";
        const extraDetails = err.errors[0].message;
        const error = {
            status,
            message,
            extraDetails
        }
        next(error);
        // console.log(message);
        // res.status(400).json({ msg: message});
    }
}

module.exports = validate;