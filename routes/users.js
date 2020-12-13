const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
var User = require("../models/User");
const { check, validationResult } = require('express-validator');

// @route    POST api/users
// @desc     Register a user
// @access   Public

router.post('/' , [
    check('name', ' Please add Name ').not().isEmpty() ,
    check('email', 'Please enter a valid email' ).isEmail() ,
    check('password', 'Please enter password with 6 more characters').isLength({ min : 6 })

] , async(req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        res.status(400).json({errors : errors.array() });
    }

    const {name, email, password} = req.body ;

    try { 
        let user = User.findOne({email});
        if(user){
            res.status(400).json({ msg : "user already exists :( " });
        }

        user = new User({
            name,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        
        await user.save();

        res.send('User saved :)');


    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

module.exports = router;