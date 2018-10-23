let path = require('path');
let express = require('express');
let mainRouter = express.Router();
const Influx = require('influx');

const influx = new Influx.InfluxDB({
    host: 'localhost',
    database: 'ocean_tides',
    schema: [
      {
        measurement: 'tide',
        fields: { height: Influx.FieldType.FLOAT },
        tags: ['unit', 'location']
      }
    ]
  });

mainRouter.get('/', function (req, res) {
    res.send('Hello World');
});

mainRouter.get('/home', function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});
module.exports = mainRouter;