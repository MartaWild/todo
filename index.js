const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite = require('sqlite3').verbose();

const app = express();
const db = new sqlite.Database('todos.sqlite');

//выполняется до других действий c db
db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS todos (id INTEGER, checked BOOLEAN, data TEXT, start_time TEXT)');

});

app.use(express.static('build'));
app.use(bodyParser.json());
app.use(cors());

app.get('/api/v1/todos', (request, response) => {
    db.all('SELECT * FROM todos', (err, rows) => {
        const todos = rows.map(r => ({
            data: r.data,
            startTime: r.start_time,
            id: r.id,
            checked: r.checked
        }));
        response.json(todos)
    });
});

app.post('/api/v1/todos', (request, response) => {
    db.serialize(() =>{
        const statement = db.prepare('INSERT INTO todos (id, checked, data, start_time) VALUES (?, ?, ?, ?)');
        statement.run(
            request.body.id,
            request.body.checked,
            request.body.data,
            (request.body.start_time ? request.body.start_time : null),
            err => {
                if (err) {
                    response.sendStatus(500)
                } else {
                    response.sendStatus(201)
                }
            }
        );
        statement.finalize();
    });
});

app.delete('/api/v1/todos/:id', (req, res) => {
    db.serialize(() => {
        const statement = db.prepare('DELETE FROM todos WHERE id=?');
        statement.run(
            req.params.id,
            err => {
                if (err) {
                    res.sendStatus(500)
                } else {
                    res.sendStatus(200)
                }
            })
    })
});

app.listen(4000, ()=> console.log('Adios!'));