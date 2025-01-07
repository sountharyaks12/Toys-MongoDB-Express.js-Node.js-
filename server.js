const express = require('express');
const bodyParser = require('body-parser');
const toyRoutes = require('./routes/toyRoutes');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const mongoose = require('mongoose');
require('dotenv').config();


mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log('MongoDB atlas connected');
}).catch(err => {
    console.error('MongoDB atlas connection error:', err);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('frontPage');
});

app.use('/toys', toyRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});