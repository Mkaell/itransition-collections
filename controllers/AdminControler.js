const mongoose = require('mongoose');
const UserModal = require('../models/Users.js') ;

const deleteUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);
    try {
        await UserModal.findByIdAndRemove(id);
        res.status(200).json({ message: "User deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    } 
}

const deleteUsers = async (req, res) => {
    const {ids} = req.body;
    try {
        await UserModal.deleteMany({_id: {$in: ids},})
        res.status(200).json({ message: "Deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
        
}

const updateAdminStatus = async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;
    try {
        await UserModal.findOneAndUpdate({ _id: id }, { $set: { role } });
    
        res.status(200).json({ message:"Update admin status successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const toggleAdminsStatus = async (req, res) => {
    const {ids} = req.body;
    try {
        await UserModal.updateMany({_id: {$in: ids}}, [{$set:{role:{$eq:[false,"$role"]}}}])
    res.status(200).json({ message: "Update admin status successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    
}

const updateBanStatus = async (req, res) => {
    const { id } = req.params;
    const { active } = req.body;
    try {
        await UserModal.findOneAndUpdate({ _id: id }, { $set: { active } });
    
        res.status(200).json({ message: 'Update active status successfully'});
    } catch (error) {
        res.status(500).json({ message: e.message });
    }
}

const toggleActiveStatus = async (req, res) => {
    const {ids} = req.body;
    try {
        await UserModal.updateMany({_id: {$in: ids}}, [{$set:{active:{$eq:[false,"$active"]}}}])
    res.status(200).json({ message: "Update active status successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// описать ошибки
const getUsers = async (req,res)=> {
    res.setHeader('Content-Type', 'application/json');
    let collectionOfUsers
    try {
         collectionOfUsers = await UserModal.find();    
    } catch (error) {
        console.log(error)
    }
    return res.json(collectionOfUsers)
}

module.exports = { 
    deleteUser,
    getUsers,
    updateAdminStatus,
    updateBanStatus,
    deleteUsers,
    toggleAdminsStatus,
    toggleActiveStatus };