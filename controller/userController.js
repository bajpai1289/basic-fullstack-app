const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcrypt')

const postUser = async (req, res) => {
    const { username, firstname, lastname, password, role } = req.body;
    if (!username || !firstname || !lastname || !password) return res.status(401).json({ "message": "username, firstname, lastname, and password are required" });
    const hashedPwd =await bcrypt.hash(password, 10);
    try {
        const result =await User.create({
            username: username,
            firstname: firstname,
            lastname: lastname,
            password: hashedPwd,
            role: role||'Employee'
        })
        console.log(result);
        return res.status(201).json({"message": "New user has been succesfully created"})
    } catch (err) {
        return res.status(500).json({ "message": err?.message });
    }
}
const getUsers = async (req, res) => {
    try {
        const result = await User.find().select("-password");
        return res.status(200).json(result);

    }catch (err) {
        return res.status(500).json({ "message": err?.message });
    }
}
const deleteUser = async (req, res) => {
    const { id } = req.body;
    if (!id) return res.status(401).json({ "message": "username is required for this operation" });
    try {
        const u = await User.findOne({ "username": id });
        if (!u) return res.status(404).json({ "message": "user does not exist" });
        const user = await User.deleteOne({ "username": id });
        return res.status(202).json({ "message": "user has been deleted succesfully"});
    } catch (err) {
        return res.status(500).json({ "message": err?.message });
    }
    
}

const updateUser = async (req, res) => {
    const { username, firstname, lastname, role } = req.body;
    if (!username) return res.status(401).json({ "message": "username is required for this operation" });
    try {
        const ifUser = await User.findOne({ "username": username });
        if(!ifUser) return res.status(404).json({"message": "no such user found"})
        
    } catch (err) {
        return res.status(500).json({ "message": err?.message });
    }
    try {
        const user = await User.updateOne({ "username": username },
            {
                $set: { "firstname": firstname, "lastname": lastname, "role": role }
            });
        return res.status(202).json({"message": "user has been update"});
    } catch (err) {
        return res.status(500).json({ "message": err?.message });
        
    }

}

module.exports = {
    postUser,
    getUsers,
    deleteUser,
    updateUser
}