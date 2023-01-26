const express = require('express');
const { sequelize } = require('./models');

const indexRouter = require('./routes');
const usersRouter = require('./routes/users');
const gamesRouter = require('./routes/games');
const resultsRouter = require('./routes/results');

const app = express();
const routes = require('./routes'); // modles/index.js가 export한 db.sequelize를 가져온다.

app.set('port', 3000);
app.use(express.json());
app.use('/', routes);

sequelize.sync({ force : false }) // 동기화 및 연결
    .then(() => {
        console.log('Database connection success !');
    })
    .catch((err) => {
        console.error(err);
    });

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/games', gamesRouter);
app.use('/reults', resultsRouter);

// 404 middleware
app.use((req, res, next) => {
    res.status(404).send(`${req.method} ${req.url} API not found !`);
});

// error exception middleware
app.use((err, req, res, next) => {
    res.status(500).json({
        message : err.message 
    })
});

app.listen(app.get('port'), () =>{
    console.log(app.get('port'), '번 포트에서 대기 중');
});