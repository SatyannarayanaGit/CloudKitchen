const { Client } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

async function createDatabase() {
    const uri = process.env.POSTGRES_URI;
    if (!uri) {
        console.error("POSTGRES_URI not found in .env");
        return;
    }
    
    // Connect to the default 'postgres' database to create our new db
    const defaultUri = uri.substring(0, uri.lastIndexOf('/')) + '/postgres';
    
    const client = new Client({ connectionString: defaultUri });
    try {
        await client.connect();
        console.log("Connected to default postgres database.");
        await client.query('CREATE DATABASE cloud_kitchen;');
        console.log("Database 'cloud_kitchen' created successfully! 🎉");
    } catch (err) {
        // 42P04 is the error code when database already exists
        if (err.code === '42P04') {
            console.log("Database 'cloud_kitchen' already exists.");
        } else {
            console.error("Failed to create database:", err.message);
        }
    } finally {
        await client.end();
    }
}

createDatabase();
