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
        const result = await User.find();
        return res.status(200).json(result);

    }catch (err) {
        return res.status(500).json({ "message": err?.message });
    }
}
module.exports = {
    postUser,
    getUsers
}