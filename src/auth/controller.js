const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const mongoose = require('mongoose');
const Session = require('./model')
router.post('/register', (req, res) => {
    const { email, password } = req.body;
    const sqliteDb = new sqlite3.Database('users.db');
    // Insert user data into SQLite
    const insertQuery = 'INSERT INTO users (email, password) VALUES (?, ?)';
    sqliteDb.run(insertQuery, [email, password], (err) => {
      if (err) {
        console.error('Error registering user: ' + err);
        res.status(500).json({ error: 'Internal Server Error' });
        const sqlite3 = require('sqlite3').verbose();
  const db = new sqlite3.Database('users.db');
  
  db.serialize(() => {
    // Create users table
    db.run('CREATE TABLE IF NOT EXISTS users (' +
    'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
    'email TEXT UNIQUE,' +
    'fullName TEXT,' +
    'profileImage TEXT,' +
    'gender TEXT,' +
    'dob DATE,' +
    'password TEXT,' +
    'mobileNumber TEXT,' +
    'age TEXT,' +
    'address TEXT,' +
    'city TEXT,' +
    'state TEXT,' +
    'pincode TEXT' +
    ')');
  });
  
  db.close();
        return;
      }
      console.log('User registered');
      res.status(201).json({ message: 'User registered successfully' });
    });
  });
  
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const sqliteDb = new sqlite3.Database('users.db');
    // Authenticate user using SQLite
    const selectQuery = 'SELECT * FROM users WHERE email = ? AND password = ?';
    sqliteDb.get(selectQuery, [email, password], async (err, row) => {
      if (err) {
        console.error('Error authenticating user: ' + err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
  
      if (row) {
        // User authenticated, create session data using MongoDB
        const sessionData = {
          username: row.username,
          // Add any other session data you need
        };
        var rs = Session(sessionData);
        var s = await rs.save();
      //   Session.create(sessionData, (err, createdSession) => {
      //     if (err) {
      //       console.error('Error creating session data: ' + err);
      //       res.status(500).json({ error: 'Internal Server Error' });
      //       return;
      //     }
  
          console.log('Session data created:', s);
          res.status(200).json({ message: 'Login successful', sessionData: s });
      //   });
      } else {
        // User not found or invalid credentials
        res.status(401).json({ error: 'Invalid credentials' });
      }
    });
  });

  module.exports = router;