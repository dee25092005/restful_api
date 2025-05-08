
const { mysql, pool } = require('../config/db');
const jwt = require('jsonwebtoken'); 
require('dotenv').config();




//loginuser
async function loginUser(req, res) {
    const { name, email } = req.body;

    try {
        const [users] = await pool.query(
            'SELECT * FROM users WHERE name = ? AND email = ? AND is_deleted = 0',
            [name, email]
        );

        if (users.length === 0) {
            return res.status(401).json({ message: 'Invalid name or email' });
        }

        const user = users[0];

        const userpayload = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role  // Now this exists
        };

        const token = jwt.sign(userpayload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        console.error('Error logging in:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}


//get all users
async function getAllUsers(req, res) {
    try{
         const [rows] = await pool.query('SELECT id, name, email FROM users WHERE is_deleted = 0');

        if (rows.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }
        res.status(201).json({
            message: 'get users successfully',
            data: rows
        });
    }catch(err){
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

//get all deleted users

async function getAlldeletedUsers(req, res) {
    try{

        const [rows] = await pool.query('SELECT id, name, email FROM users WHERE is_deleted = 1');

        if (rows.length === 0) {
            return res.status(404).json({ message: 'No deleted users found' });
        }
        res.status(201).json({
            message: 'get deleted users successfully',
            data: rows
        });
    }catch(err){
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

//get user by id

async function getUserbyID(req, res) {
    try{
         const {id} = req.params; 
         const [rows] = await pool.query('SELECT * FROM users WHERE id = ? AND is_deleted = 0', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }
        res.status(200).json({
            message: 'get users by id successfully',
            data: rows
        });
    }catch(err){
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}


//create user

async function createUser(req, res) {
    try {
      const { name, email, password } = req.body;
  
      const [result] = await pool.query(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [name, email, password]
      );
  
      res.status(201).json({
        message: 'User created successfully',
        userId: result.insertId,
      });
    } catch (err) {
      console.error('Error creating user:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }


  //update user by id
async function updateUser(req, res){
    try{
        const {id} = req.params;
        const {name, email, password} = req.body;

        const [result] = await pool.query('UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?',[name, email, password, id]);

        if(result.affectedRows === 0){
            return res.status(404).json({message: 'User not found'});
        }
        res.status(200).json({
            message: 'User updated successfully',
            userId: id
        });

    }catch(err){
        console.error('Error updating users:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

//delete user by id
async function deleteUser(req, res){
    try{
        const {id} = req.params;
        const [result] = await pool.query('UPDATE users SET is_deleted = 1 WHERE id = ?',[id]);
        if(result.affectedRows === 0){
            return res.status(404).json({message: 'User not found'});
        }

        res.status(200).json({
            message: 'User deleted successfully',
            userId: id
        })
    }catch(err){
        console.error('Error deleting users:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

//restore user by id
async function restoreUser(req, res){
    try{
        const {id} = req.params;
        const [result] = await pool.query('UPDATE users SET is_deleted = 0 WHERE id = ?',[id]);

        if(result.affectedRows === 0){
            return res.status(404).json({message: 'User not found'});
        }
        res.status(200).json({
            message: 'User restored successfully',
            userId: id
        })
    }catch(err){
        console.error('Error restoring users:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

//authenticate token
function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        console.log('No token found');
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.log('Token verification failed:', err);
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
}


//authenticate role
function authenticateRole(...allowedRoles) {
    return (req, res, next) => {
        const role = req.user.role;
        if (!allowedRoles.includes(role)) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    }
}


module.exports = {
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

};