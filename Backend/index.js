require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const mongoose = require("mongoose");
const cors = require("cors");
const AllRoutes = require("./Routers/AllRoutes.js");
const AuthRoutes = require("./Routers/AuthRoutes.js");
require("./Config/Passport.js");

const MongoURL = process.env.MONGODB_URL;
async function main()
{
    await mongoose.connect(MongoURL);
}

main().then(()=>
{
    console.log("successfully connected to mongodb");
}).catch((err)=>console.log("err at connection to mongodb",err));


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors(
    {
        origin: process.env.FRONTEND_URL || 'http://localhost:5173',
        credentials: true
    }
));

app.get("/", (req, res)=>
{
    res.send("hi buddy");
});

app.use((req, res, next)=>
{
    res.locals.currentUser = req.user;
    next();
})

app.use("/ImageBuddy/api/", AllRoutes);
app.use("/ImageBuddy/api/auth", AuthRoutes);

app.listen(port, ()=>
{
    console.log("successfully connected at post:",port);
});

