const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const port = 3000;

app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'step_tracker'
});

connection.connect((err) => {
    if (err) {
        console.error('Veritabanına bağlanırken hata:', err);
        return;
    }
    console.log('Veritabanına başarıyla bağlanıldı.');
});

app.post('/api/steps', (req, res) => {
    const stepCount = req.body.step_count;
    const query = 'INSERT INTO steps (step_count) VALUES (?)';
    connection.query(query, [stepCount], (error, results) => {
        if (error) {
            res.status(500).send('Veritabanına veri eklenirken hata oluştu.');
            return;
        }
        res.send({ id: results.insertId, step_count: stepCount });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
