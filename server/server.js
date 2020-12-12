const express = require('express');
const app = express();

const sequelize = require('./models').sequelize;
const bodyParser = require('body-parser');

sequelize.sync();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());

const {
    Teacher,
    Sequelize: { Op }
  } = require('./models');
sequelize.query('SET NAMES utf8;');

app.post('/add/data', (req, res) => {
    console.log(req.body)

      Teacher.create({
          name : req.body.data
      })
      .then( result => {
          res.send(result)
      })
      .catch( err => {
          console.log(err)
          throw err;
      })
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
})