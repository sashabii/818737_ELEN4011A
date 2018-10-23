/**
 * In this example we'll create a server which has an index page that prints
 * out "hello world", and a page `http://localhost:3000/times` which prints
 * out the last ten response times that InfluxDB gave us.
 *
 * Get started by importing everything we need!
 */
let path = require('path');
const Influx = require('influx')
const express = require('express')
const http = require('http')
const os = require('os')

const app = express()

/**
 * Create a new Influx client. We tell it to use the
 * `express_response_db` database by default, and give
 * it some information about the schema we're writing.
 */
const influx = new Influx.InfluxDB({
  host: 'localhost',
  database: 'res_consumption',
  schema: [
      {
          measurement: 'energy_data',
          fields: {
              usage: Influx.FieldType.FLOAT
          },
          tags: [
              'res_id'
          ]
      }
  ]
})


/**
 * Next we define our middleware and hook into the response stream. When it
 * ends we'll write how long the response took to Influx!
 */
app.use(express.static(path.join(__dirname, 'views')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
})
app.get('/ResA', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'indexA.html'));
})
app.get('/ResB', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'indexB.html'));
})
app.get('/ResC', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'indexC.html'));
})
app.get('/ResD', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'indexD.html'));
})
app.get('/times1', function (req, res) {
  influx.query(`
    select * from energy_data
    where res_id = 'res-1'
    order by time asc
    limit 1000
  `).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).send(err.stack)
  })
})

app.get('/times2', function (req, res) {
  influx.query(`
    select * from energy_data
    where res_id = 'res-2'
    order by time asc
    limit 1000
  `).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).send(err.stack)
  })
})

app.get('/times3', function (req, res) {
  influx.query(`
    select * from energy_data
    where res_id = 'res-3'
    order by time asc
    limit 1000
  `).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).send(err.stack)
  })
})

app.get('/times4', function (req, res) {
  influx.query(`
    select * from energy_data
    where res_id = 'res-4'
    order by time asc
    limit 1000
  `).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).send(err.stack)
  })
})

/**
 * Now, we'll make sure the database exists and boot the app.
 */
influx.getDatabaseNames()
  .then(names => {
    if (!names.includes('express_response_db')) {
      return influx.createDatabase('express_response_db')
    }
  })
  .then(() => {
    http.createServer(app).listen(3000, function () {
      console.log('Listening on port 3000')
    })
  })
  .catch(err => {
    console.error(`Error creating Influx database!`)
  })