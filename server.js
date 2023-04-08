const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 3500;
const connectDB = require('./database/dbConn')
const { getUsers, postUser, deleteUser, updateUser } = require('./controller/userController')
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("The server is up running");
});

app.get('/users', getUsers);
app.post('/users', postUser);
app.delete('/users', deleteUser);
app.patch('/users', updateUser);


mongoose.connection.on('open', () => {
    console.log('mongoDB connected');
    app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
});
