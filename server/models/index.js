/* server/models/index.js */

'use strict';

const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config', 'db.json'))[
    env
  ];
const db = {};

let sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
    {
      define: {
        charset: 'utf8',
        collate: 'utf8_general_ci'
      }
    }
  );
  
    db.sequelize = sequelize;
    db.Sequelize = Sequelize;

    db.sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.log('Unable to connect to the database: ', err);
    });

    db.Teacher = require('./teacher')(sequelize, Sequelize);
    db.Class = require('./class')(sequelize, Sequelize);

    //1:1관계 teacher 안에 class가 생성된다.
    //db.Teacher.hasOne(db.Class);

    //1:m 관계

    db.Teacher.hasMany(db.Class, {
      foreignKey: 'teacher_id',
      sourceKey : 'id'
  });
// 1 : m 관계
/*
    db.Teacher.belongsToMany(db.Class, {
    through : 'scedule',
    foreignKey : 'teacher_id'
});
*/

// n:m 관계
db.Class.belongsToMany(db.Teacher, {
    through : 'scedule',
    foreignKey: 'class_id',
}); 
  db.Class.belongsTo(db.Teacher, {
      foreignKey: 'teacher_id',
      targetKey : 'id'
  });

db.secret = '(9*)5$&!3%^0%^@@2$1!#5@2!4';
module.exports = db;