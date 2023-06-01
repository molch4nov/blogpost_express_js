const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./auth');
const blogRoutes = require('./blog');
const bp = require('body-parser')
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use('/auth', authRoutes);
app.use('/api', blogRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
