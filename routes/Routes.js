const express = require('express');
const router = express.Router();

// Import the controller functions
const { 
    getAllUsers,
    getAlldeletedUsers,
    createUser,
    getUserbyID,
    updateUser,
    deleteUser,
    restoreUser,
    loginUser,
    authenticateToken,
    authenticateRole
} = require('../controllers/Controller');


const auth = authenticateToken;
const authrole = authenticateRole;

// Define the routes and associate them with controller functions

//public routes
router.post('/login', loginUser);
router.post('/create', createUser);
router.get('/getuser',auth ,authrole('admin') , getAllUsers);

//private routes
router.get('/getdeleteduser',auth, authrole('admin') , getAlldeletedUsers);
router.get('/getuserbyid/:id', auth, getUserbyID);
router.put('/updateuser/:id',auth, updateUser);
router.delete('/deleteuser/:id', auth, deleteUser);
router.put('/restoreuser/:id',auth ,authrole('admin') ,  restoreUser);






module.exports = router;