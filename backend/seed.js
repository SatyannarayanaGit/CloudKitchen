const { sequelize, MenuItem } = require('./models');
const dotenv = require('dotenv');

dotenv.config();

const menuItems = [
    {
        name: 'Lemon Rice',
        description: 'Vibrant and zesty South Indian rice tempered with mustard seeds, curry leaves, and peanuts.',
        price: 120,
        category: 'Rice Dishes',
        image: '/images/lemon_rice.png',
    },
    {
        name: 'Tomato Rice',
        description: 'Spicy and tangy rice cooked with fresh tomatoes and aromatic spices.',
        price: 130,
        category: 'Rice Dishes',
        image: '/images/tomato_rice.png',
    },
    {
        name: 'Veg Fried Rice',
        description: 'Classic Indo-Chinese style fried rice with colorful vegetables and spring onions.',
        price: 150,
        category: 'Rice Dishes',
        image: '/images/veg_fried_rice.png',
    },
    {
        name: 'Coconut Rice',
        description: 'Fragrant rice mixed with fresh grated coconut and tempered with cashews.',
        price: 140,
        category: 'Rice Dishes',
        image: '/images/coconut_rice.png',
    },
    {
        name: 'Jeera Rice',
        description: 'Aromatic Basmati rice tempered with cumin seeds and a touch of ghee.',
        price: 110,
        category: 'Rice Dishes',
        image: '/images/jeera_rice.png',
    }
];

const seedDB = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync(); // ensure tables exist
        await MenuItem.destroy({ where: {} });
        await MenuItem.bulkCreate(menuItems);
        console.log('Database Seeded Successfully with Veg Rice Dishes!');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDB();
