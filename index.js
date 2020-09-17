const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
const db = new sqlite.Database('todos.sqlite');

//выполняется до других действий c db
db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS todos (id INTEGER, checked BOOLEAN, data TEXT, item_order INTEGER)');
    db.run('CREATE TABLE IF NOT EXISTS users (id_user INTEGER, login TEXT, password_hash TEXT)');
});

app.use(cors({origin: 'http://localhost:3000', credentials: true }));
app.use(cookieParser());
app.use(session({
    secret: 'hungary cat',
    cookie: {}
}));
app.use(express.static('build'));
app.use(bodyParser.json());

app.get('/api/v1/todos', (request, response) => {
    if (request.session.userId == null){
        response.sendStatus(403);
        return;
    }
    const statement = db.prepare('SELECT * FROM todos WHERE user_id = ? ORDER BY item_order');
    statement.all(
        request.session.userId,
        (err, rows) => {
        const todos = rows.map(r => ({
            data: r.data,
            id: r.id,
            checked: r.checked,
            order: r.item_order,
            userId: r.user_id
        }));
        response.json(todos)
    });
});

app.post('/api/v1/todos', (request, response) => {

    db.serialize(() =>{
        const statement = db.prepare('INSERT INTO todos (id, checked, data, item_order, user_id) VALUES (?, ?, ?, ?, ?)');
        statement.run(
            request.body.id,
            request.body.checked,
            request.body.data,
            request.body.order,
            request.session.userId,
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

app.post('/api/v1/users', (request, response) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(request.body.password, salt);
    db.serialize(() =>{
        const statement = db.prepare('INSERT INTO users (login, password_hash, id_user) VALUES (?, ?, ?)');
        statement.run(
            request.body.login,
            hash,
            Math.random(),
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

app.post('/api/v1/login', (request, response) => {
    const statement = db.prepare('SELECT * FROM users WHERE login = ?');
    statement.get(
        request.body.login,
        (err, row) => {
        if(err){
            response.sendStatus(500);
            return;
        }
        if (!row){
            response.sendStatus(404);
            return;
        }
        if (bcrypt.compareSync(request.body.password, row.password_hash)){
            request.session.userId = row.id_user;
            response.sendStatus(200);
        } else {
            response.sendStatus(400);
        }
    });
    statement.finalize();
});


app.delete('/api/v1/todos/:id', (req, res) => {
    db.serialize(() => {
        const statement = db.prepare('DELETE FROM todos WHERE id=?');
        console.log(req.params.id);
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

app.put('/api/v1/logout/', (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
});

app.listen(4000, ()=> console.log('Adios!'));