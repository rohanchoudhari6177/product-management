const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // This is for your CSS
app.set('view engine', 'ejs');

// Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Update this if yours is different
    password: '', // Update this if you have a password
    database: 'ecommerce_db'
});

// Route to show the dashboard
app.get('/admin/dashboard', (req, res) => {
    db.query('SELECT * FROM products', (err, results) => {
        if (err) return res.send(err);
        res.render('dashboard', { products: results });
    });
});

// Route to add a product
app.post('/admin/add-product', (req, res) => {
    const { name, sku, price, stock } = req.body;
    const query = 'INSERT INTO products (product_name, SKU, price, inventory_count, status) VALUES (?, ?, ?, ?, 1)';
    db.query(query, [name, sku, price, stock], (err) => {
        if (err) return res.send(err);
        res.redirect('/admin/dashboard');
    });
});

app.listen(3000, () => console.log('Server is running on http://localhost:3000'));