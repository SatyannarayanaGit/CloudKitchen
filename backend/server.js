const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { sequelize } = require('./models');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/menu', require('./routes/menuRoutes'));
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/order', require('./routes/orderRoutes'));

// Basic Route
app.get('/', (req, res) => {
    res.send('Cloud Kitchen API is running...');
});

// PostgreSQL Connection
sequelize.sync({ alter: true }) // Adjust in production
    .then(() => console.log('Connected to PostgreSQL and models synced'))
    .catch((err) => console.error('PostgreSQL connection error:', err));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
