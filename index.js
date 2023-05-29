const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./auth');
const blogRoutes = require('./blog');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/api', blogRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
