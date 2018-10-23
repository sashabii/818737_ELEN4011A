const Influx = require('influx')
const express = require('express')
const http = require('http')
const os = require('os')
const app = express()
var fs = require('fs');
var csv = require('fast-csv');
var inputFile = "data_csvs/eg1.csv";

var res = "res-1"

// Set up Schema
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

influx.createDatabase('res_consumption')

fs.createReadStream(inputFile)
    .pipe(csv())
    .on('data', function (data) {
        data = String(data).split(",")
        var consumption = parseFloat(data[1]);
        var date = new Date(data[0]).getTime();
        date = date * 1000000;
        console.log(date);
        if (consumption > 0 ){
            influx.writePoints([
                {
                    measurement: 'energy_data',
                    timestamp: date,
                    tags: { res_id: res },
                    fields: { usage: consumption }
                }
            ])
        }
        
    })
    .on('end', function () {
        console.log('Read finished');
    })


// const influx = new Influx.InfluxDB({
//   host: 'localhost',
//   database: 'express_response_db',
//   schema: [
//     {
//       measurement: 'response_times',
//       fields: {
//         path: Influx.FieldType.STRING,
//         duration: Influx.FieldType.INTEGER
//       },
//       tags: [
//         'host'
//       ]
//     }
//   ]
// })

// const influx2 = new Influx.InfluxDB({
//   host: 'localhost',
//   database: 'express_response_db',
//   schema: [
//     {
//       measurement: 'measured_energy',
//       fields: {
//         path: Influx.FieldType.STRING,
//         usage: Influx.FieldType.FLOAT
//       },
//       tags: [
//         'res'
//       ]
//     }
//   ]
// })


// app.use((req, res, next) => {
//   const start = Date.now()

//   res.on('finish', () => {
//     const duration = Date.now() - start
//     console.log(`Request to ${req.path} took ${duration}ms`)

//     influx2.writePoints([
//       {
//         measurement: 'measured_energy',
//         timestamp:'1539010159000000000',
//         tags: { res: 'Not Not Junction' },
//         fields: { usage:10, path: req.path }
//       }
//     ]).catch(err => {
//       console.error(`Error saving data to InfluxDB! ${err.stack}`)
//     })
//   })
//   return next()
// })

// app.get('/', function (req, res) {
//   setTimeout(() => res.end('Hello world!'), Math.random() * 500)
// })

// app.get('/times', function (req, res) {
//   influx.query(`
//     select * from response_times
//     where host = ${Influx.escape.stringLit(os.hostname())}
//     order by time desc
//     limit 10
//   `).then(result => {
//     res.json(result)
//   }).catch(err => {
//     res.status(500).send(err.stack)
//   })
// })

// /**
//  * Now, we'll make sure the database exists and boot the app.
//  */
// influx.getDatabaseNames()
//   .then(names => {
//     if (!names.includes('express_response_db')) {
//       return influx.createDatabase('express_response_db')
//     }
//   })
//   .then(() => {
//     http.createServer(app).listen(3000, function () {
//       console.log('Listening on port 3000')
//     })
//   })
//   .catch(err => {
//     console.error(`Error creating Influx database!`)
//   })

http.createServer(app).listen(3000, function () {
    console.log('Listening on port 3000')
})