const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite = require('sqlite3').verbose();

const app = express();
const db = new sqlite.Database('todos.sqlite');

//выполняется до других действий c db
db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS todos (id INTEGER, checked BOOLEAN, data TEXT, item_order INTEGER)');

});

app.use(express.static('build'));
app.use(bodyParser.json());
app.use(cors());

app.get('/api/v1/todos', (request, response) => {
    db.all('SELECT * FROM todos ORDER BY item_order', (err, rows) => {
        const todos = rows.map(r => ({
            data: r.data,
            id: r.id,
            checked: r.checked,
            order: r.item_order
        }));
        response.json(todos)
    });
});

app.post('/api/v1/todos', (request, response) => {
    db.serialize(() =>{
        const statement = db.prepare('INSERT INTO todos (id, checked, data, item_order) VALUES (?, ?, ?, ?)');
        statement.run(
            request.body.id,
            request.body.checked,
            request.body.data,
            request.body.order,
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

app.put('/api/v1/todos/:id', (req, res) => {
    db.serialize(() => {
        const statement = db.prepare('UPDATE todos SET data=?, checked=?, id=?, item_order=? WHERE id=?');
        statement.run(
            req.body.data,
            req.body.checked,
            req.body.id,
            req.body.order,
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

app.put('/api/v1/todos/:id', (req, res) => {
    db.serialize(() => {
        const statement = db.prepare('UPDATE todos SET item_order=? WHERE id=?');
        statement.run(
            req.body.order,
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