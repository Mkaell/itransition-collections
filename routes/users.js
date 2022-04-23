const express = require("express");
const router = express.Router();
const {
    getUsers,
    deleteUser,
    updateAdminStatus,
    updateBanStatus,
    deleteUsers,
    toggleAdminsStatus,
    toggleActiveStatus,
        } = require('../controllers/AdminControler')


router.get('/getUsers', getUsers);
router.post('/deleteUsers', deleteUsers);
router.post('/toggleAdmins', toggleAdminsStatus);
router.post('/toggleActive', toggleActiveStatus);
router.patch('/admin/:id',  updateAdminStatus);
router.patch('/ban/:id',  updateBanStatus);
router.delete('/:id',  deleteUser);


module.exports = router;