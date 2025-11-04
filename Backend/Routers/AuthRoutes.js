const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

const generateToken = (req)=>
{
    return jwt.sign(
        {
            id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            history: req.history
        },
        process.env.SECRET,
        {
            expiresIn: "15d"
        }
    )
}

router.route("/")
.get((req, res)=>
{
    res.send("pk");
})

router.route("/google")
.get(passport.authenticate("google", {scope: ["profile", "email"]}));

router.get("/google/callback", passport.authenticate("google", {session: false}),
    (req, res)=>
    {
        try {
            
            let token = generateToken(req);
            return res.redirect(`${process.env.FRONTEND_URL}/signUp/success/${token}`)
            // return res.status(200).json({message: "Success",token: token});


        } catch (error) {
            console.log("err at callback google: ",error);
            res.redirect(`${process.env.FRONTEND_URL}/signIn`)
        }
    }
);

module.exports = router;