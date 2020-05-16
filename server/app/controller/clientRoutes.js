const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = mongoose.model('user');
const jwt = require('jsonwebtoken');
const {jwtkey} = require('../../config/key');
const requireToken = require('../../middlewares/requireToken');



module.exports.controller = function (app) {

    app.get('/api/users/auth',requireToken,(req,res)=>{
        res.send(req.user.username);
    })

    router.post("/api/users/signup", async function (req, res) {


        const {
            firstname,
            lastname,
            username,
            password
        } = req.body;

        try {

            const user = new User({
                firstname,
                lastname,
                username,
                password
            });
            await user.save();
            const token = jwt.sign({userId:user._id}, jwtkey);
            res.send({token, success:true});
        

        } catch (err) {
            return res.status(422).send(err.message);
            console.log(err);
        }

    })


    router.post("/api/users/login", async function (req, res) {

        const {username,password} = req.body
    if(!username || !password){
        return res.status(422).send({error :"must provide email or password"})
    }
    const user = await User.findOne({username})
    if(!user){
        return res.status(422).send({error :"must provide email or password"})
    }
    try{
      await user.comparePassword(password);    
      const token = jwt.sign({userId:user._id}, jwtkey)
      res.send({loginSuccess: true})
    }catch(err){
        return res.status(422).send({error :"must provide email or password"})
    }
        
    })


    router.get("/api/users/logout", requireToken, function (req, res) {
            User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
                if (err) return res.json({ success: false, err });
                return res.status(200).send({
                    success: true
                });
            });

    })


    app.use(router);

}