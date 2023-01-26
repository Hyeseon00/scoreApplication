'use strict';

const fs = require('fs'); // library for file system r/w
const path = require('path'); // library for Local PATH search
const Sequelize = require('sequelize'); // Sequelize class library

// model object declaration
const User = require('./user'); 
const Game = require('./game');
const Result = require('./result');

const basename = path.basename(__filename); // To exclude the current file name from the code below
const env = process.env.NODE_ENV || 'development'; // Gets the current node execution environment
const config = require(__dirname + '/../config/config.json')[env]; // Gets the object with db connection environment(config.json)
const db = {}; // empty object declaration

let sequelize; // empty variable declaration (variable where session information will be stored)
if (config.use_env_variable) { // For security reasons, define whether db's connection information is stored and read in the environment variable
  sequelize = new Sequelize(process.env[config.use_env_variable], config); // Create a new session with db(read environment variables)
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config); // Create a new session with db (read "config.json" file)
}


// fs // Create model(db tables infomation)
//   .readdirSync(__dirname) // Read all files in the current directory
//   .filter(file => {
//     return (
//       file.indexOf('.') !== 0 && // 첫째, .으로 시작하지 않고,
//       file !== basename && // 둘째, index.js(자기 자신) 파일이 아니고,
//       file.slice(-3) === '.js' // 셋째, .js 확장자를 가진 파일인지 확인
//     );
//   })
//   .forEach(file => { // 필터링 후 남은 파일은 model로 간주하고 하나씩 불러와 db object에 담는다.
//     const model = require(path.join(__dirname, file)).init(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

// // 각각의 모델에서 모델 간의 관계를 정의하는 함수(associate) 실행
// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db); // 관계 정의를 위해서 다른 model도 봐야하므로 model들이 담긴 db를 파라미터로 넘긴다.
//   }
// });

// db 객체에 User, Game, Result 모델 담기
db.User = User;
db.Game = Game;
db.Result = Result;

// 각 모델의 static.init method 호출
User.init(sequelize);
Game.init(sequelize);
Result.init(sequelize);

// 다른 테이블과의 관계 연결을 위한 associate method 실행
User.associate(db);
Game.associate(db);
Result.associate(db);


db.sequelize = sequelize; // session과 
db.Sequelize = Sequelize; // class를 db에 추가

module.exports = db;