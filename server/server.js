require("dotenv").config();
const express = require("express");
const app = express();
const cors = require('cors');
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const serviceRoute = require("./router/service-router");
const adminRoute = require("./router/admin-router");
const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");

const corsOptions = {
  origin: 'http://localhost:5173',
  method: "GET, POST, PATCH, PUT, DELETE, HEAD",
  credentails: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);

// Lets takle admin Logic
app.use("/api/admin", adminRoute)


// app.get('/',(req,res)=>{
//     res.status(200).send("HEllo");
// })
// app.get('/register',(req,res)=>{
//     res.status(200).send("Welcome to Registration");
// })

app.use(errorMiddleware);

const PORT = 5000;
connectDb().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is running on port : ${PORT}`);
    })
})
