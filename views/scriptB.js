const fetchData1 = (place) => {
    return fetch(`/times1`)
      .then(res => {
        if (res.status !== 200) {
          console.log(res);
        }
        return res;
      })
      .then(res => res.json())
      .catch(error => console.log(error));
  }

  const fetchData2 = (place) => {
    return fetch(`/times2`)
      .then(res => {
        if (res.status !== 200) {
          console.log(res);
        }
        return res;
      })
      .then(res => res.json())
      .catch(error => console.log(error));
  }

  const fetchData3 = (place) => {
    return fetch(`/times3`)
      .then(res => {
        if (res.status !== 200) {
          console.log(res);
        }
        return res;
      })
      .then(res => res.json())
      .catch(error => console.log(error));
  }

  const fetchData4 = (place) => {
    return fetch(`/times4`)
      .then(res => {
        if (res.status !== 200) {
          console.log(res);
        }
        return res;
      })
      .then(res => res.json())
      .catch(error => console.log(error));
  }
  
  const fetchAllLocations = () => {
    return Promise.all([
              fetchData2('res-1'),
              fetchData2('res-2'),
              fetchData2('res-3'),
              fetchData2('res-4')
           ])
          .then(parsedRes => {
            const mutatedArray = parsedRes.map( arr => {
              return Object.assign({}, {
                name: arr[0].res_id,
                data: arr.map( obj => Object.assign({}, {
                  x: (moment(obj.time).unix())*1000,
                  y:obj.usage
                }))
              });
            });
  
            return Highcharts.chart('container', {
              colors: ['#508991', '#175456', '#09BC8A', '#78CAD2'],
              chart: {
                backgroundColor: {
                    linearGradient: [0, 600, 0, 0],
                    stops: [
                      [0, 'rgb(255, 255, 255)'],
                      [1, 'rgb(161, 210, 206)']
                    ]
                },
                type: 'spline'
              },
              title: {
                text: 'Residency B Energy Consumption',
                style: {
                  'color': '#175456',
                }
              },
              xAxis: {
                type: 'datetime'
              },
              yAxis: {
                title: {
                  text: 'Energy Consumed (kWH)'
                }
              },
              plotOptions: {
                series: {
                  turboThreshold: 2000,
                }
              },
              series: mutatedArray
            });
          })
          .catch(error => console.log(error));
  };
  
  fetchAllLocations();