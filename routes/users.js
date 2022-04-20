const express = require("express");
const router = express.Router();
const UserModal = require('../models/Users.js') ;
router.get('/getUsers',async (req,res)=> {

    res.setHeader('Content-Type', 'application/json');
    let collectionOfUsers
    try {
         collectionOfUsers = await UserModal.find();
        
    } catch (error) {
        console.log(error)
    }
    
    return res.json(collectionOfUsers)
});


module.exports = router;