const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");


router.get("/login",(req,res)=>{
    res.render("./user/login",{
        title: "Login | WhisperCloud"
    });
})

router.post("/signin", async(req, res) => {
    try {
        const {email, password} = req.body
        console.log(email)
        const userData= await User.find({email: {$eq: email}})
        console.log(userData.length)

        // Check if user's email is present in the database
        if (userData.length != 0) {
            const userPassword = userData[0].password

            // Check if the passwords match
            bcrypt.compare(password, userPassword, (err, data) => {
                if (err) throw err

                if (data) {
                    res.redirect("/homepage")
                } else {
                    return res.status(401).json({msg: "The inputted password did not mach the account holder's password. Please try again."})
                }
            })
        } else {
            return res.status(401).json({msg: "The inputted email address was not found in our system. Please try again or sign up for an account if you haven't already."})
        }
    } catch (error) {
        console.log(error)
    }

})

router.get("/homepage", (req, res) => {
    res.render("./user/homepage", {
        title: "Homepage | WhisperCloud"
    })
})

router.get("/signup",(req,res)=>{
    res.render("./user/signup",{
        title: "Sign Up | WhisperCloud"
    });
})
router.post("/signup",async(req,res)=>{
     try{
        const {name,email,password} = req.body;
        const hashedPassowrd = await bcrypt.hash(password,12);
        const newUser = new User({
            name:name, 
            email: email,
            password:hashedPassowrd
        });
        await newUser.save();
        console.log("User created successfully!");

    }catch(error){
        console.log("Error !! User was not created");
        console.log(error);
    }
    res.redirect("/");

})

module.exports = router;
