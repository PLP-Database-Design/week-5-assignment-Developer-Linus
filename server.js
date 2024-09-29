// Import dependencies
const express = require('express');
const app = express();
const mysql = require('mysql2');
const dotenv = require('dotenv');

// Config environment variables
dotenv.config();

// Create a connection object
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Test connection
db.connect((err) => {
    // If the connection is unsuccessful
    if (err) {
        return console.log('Error connecting to the database:', err);
    }
    // If the connection is successful
    console.log('Successfully connected to MySQL:', db.threadId);
});

// Question 1: Retrieve all patients
app.get('', (req, res) => {
    const getPatients = "SELECT patient_id, first_name, last_name, date_of_birth FROM patients";
    db.query(getPatients, (err, data) => {
        // If there is an error
        if (err) {
            return res.status(400).send('Failed to get patients', err);
        }
        res.status(200).send(data);
    });
});

// Question 2: Retrieve all providers
app.get('', (req, res) => {
    const getProviders = "SELECT first_name, last_name, provider_specialty FROM providers";
    db.query(getProviders, (err, data) => {
        // If there is an error
        if (err) {
            return res.status(400).send('Failed to get providers', err);
        }
        res.status(200).send(data);
    });
});

// Question 3: Filter patients by first name
app.get('', (req, res) => {
    const getPatientsByFirstName = "SELECT first_name FROM patients"; // SQL query with WHERE clause

    db.query(getPatientsByFirstName, (err, data) => {
        if (err) {
            return res.status(400).send('Failed to get patients', err);
        }
        res.status(200).send(data);
    });
});

// Question 4: Retrieve providers by specialty
app.get('', (req, res) => {
    const getProvidersBySpecialty = "SELECT provider_specialty FROM providers";

    db.query(getProvidersBySpecialty, (err, data) => {
        if (err) {
            return res.status(400).send('Failed to get providers', err);
        }
        res.status(200).send(data);
    });
});

// Listen to the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
