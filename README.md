# ELEN4011A

<h1> ELEN4011A MVP </h1>

<h2> Getting Started: </h2>

<h4>Install Node.js </h4>  

<h4>Install and run InfluxDB</h4>

In order to host the database locally, TICK stack needs to be installed and run. Intructions on how to do so on Windows are found on:
> https://www.influxdata.com/blog/running-the-tick-stack-on-windows/
(If errors are recieved running these, try opening a terminal as admin.)

<h4>  Run the tick stack: Order ITKC  </h4>

<h4> Populate the database as follows: </h4>
<li> Run the following command:
> node data_csvs/load_data.js
<li> Increment file and residency names on lines 8 and 10 in the load_data.js file
<li> Repeat for all four CSV files

<h4> Run Application! </h4>
> node app.js

Visualisation is based off tutorial found at: https://www.highcharts.com/blog/post/visualizing-time-series-data-with-highcharts-influxdb/