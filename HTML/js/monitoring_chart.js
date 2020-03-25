window.onload = function(){
  $.getJSON("js/data/sensors_file.json", function(json){
    console.log('Success');

    //Configuration variables
    var updateInterval = 1000 //in ms
    var numberElements = 60;

    //Globals
    var updateCount = 0;

    // Chart Objects
    var outdoor_temp = "Outdoor air temperature";
    var exhaust_temp = "The temperature of the exhaust air";
    var supply_temp = "The temperature of the supply air";
    var h_exchanger_temp = "The temperature of the heat exchanger";
    var after_h_exchanger_temp = "Temperature after heat exchanger";
    var ret_coolant_temperature = "Return coolant temperature";
    var lighting = "Lighting in the vent.camera";
    var pressure_ret_pipe = "The pressure in the return pipe";
    var pressure_direct_pipe = "Pressure in the direct pipeline";


    var commonOptions = {
      scales: {
        xAxes: [{
          type: 'time',
          time: {
            displayFormats: {
              millisecond: 'mm:ss:SSSS'
            }
          },
          scaleLabel: {
            display: true,
            labelString: "Время получения значения",
            fontSize: 18
          }
        }],
        yAxes: [{
          ticks: {
            beginAtZero: false
          },
          scaleLabel: {
            display: true,
            labelString: "Значение датчика",
            fontSize: 18
          }
        }]
      },
      legend: {
        display:false
      },
      tooltips:{
        enabled: false
      }
    };

    //chart instances & configuration

    //1. Outdoor air temperature (TE 1)
    var outdoor_temp = new Chart(outdoor_temp, {
      // The type of chart we want to create
      type: 'line',

      // The data for our dataset
      data: {
      //labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
          label: 'Температура наружного воздуха',
          fill: true,
          //backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: 0 //createlist(60, 100, 0)//[0, 10, 5, 2, 20, 30, 45]
                }]
            },

          // Configuration options go here
          options: Object.assign({}, commonOptions,{
            title:{
              display: true,
              text: "Температура наружного воздуха",
              fontSize: 18
            }
          })
      });

    //2. The temperature of the exhaust air (TE 2)
    var exhaust_temp = new Chart(exhaust_temp, {
      // The type of chart we want to create
      type: 'line',
      // The data for our dataset
      data: {
      //labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
          label: "Температура выхлопного воздуха",
          fill: true,
          //backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: 0 //createlist(60, 100, 0)//[0, 10, 5, 2, 20, 30, 45]
                }]
            },

          // Configuration options go here
          options: Object.assign({}, commonOptions,{
            title:{
              display: true,
              text: "Температура выхлопного воздуха",
              fontSize: 18
            }
          })
      });

    //3. The temperature of the supply air (TE 3)
    var supply_temp = new Chart(supply_temp, {
      // The type of chart we want to create
      type: 'line',
      // The data for our dataset
      data: {
      //labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
          label: "Температура приточного воздуха",
          fill: true,
          //backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: 0 //createlist(60, 100, 0)//[0, 10, 5, 2, 20, 30, 45]
                }]
            },

          // Configuration options go here
          options: Object.assign({}, commonOptions,{
            title:{
              display: true,
              text: "Температура приточного воздуха",
              fontSize: 18
            }
          })
      });

    //4. The temperature of the heat exchanger (TE 4)
    var h_exchanger_temp = new Chart(h_exchanger_temp, {
      // The type of chart we want to create
      type: 'line',
      // The data for our dataset
      data: {
      //labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
          label: "Температура до рекуператора",
          fill: true,
          //backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: 0 //createlist(60, 100, 0)//[0, 10, 5, 2, 20, 30, 45]
                }]
            },

          // Configuration options go here
          options: Object.assign({}, commonOptions,{
            title:{
              display: true,
              text: "Температура до рекуператора",
              fontSize: 18
              }
            })
        });

    //5. Temperature after heat exchanger (TE 5)
    var after_h_exchanger_temp = new Chart(after_h_exchanger_temp, {
      // The type of chart we want to create
      type: 'line',
      // The data for our dataset
      data: {
      //labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
            label: "Температура после рекуператора",
            fill: true,
            //backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: 0 //createlist(60, 100, 0)//[0, 10, 5, 2, 20, 30, 45]
                  }]
              },

      // Configuration options go here
      options: Object.assign({}, commonOptions,{
              title:{
              display: true,
              text: "Температура после рекуператора",
              fontSize: 18
              }
            })
        });

    //6. Return coolant temperature (t e 6)
    var ret_coolant_temperature = new Chart(ret_coolant_temperature, {
      // The type of chart we want to create
      type: 'line',
      // The data for our dataset
      data: {
      //labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
            label: "Температура обратного теплоносителя",
            fill: true,
            //backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: 0 //createlist(60, 100, 0)//[0, 10, 5, 2, 20, 30, 45]
                  }]
              },

      // Configuration options go here
      options: Object.assign({}, commonOptions,{
              title:{
              display: true,
              text: "Температура обратного теплоносителя",
              fontSize: 18
              }
            })
        });

    //7. Lighting in the vent.camera
    var lighting = new Chart(lighting, {
      // The type of chart we want to create
      type: 'line',
      // The data for our dataset
      data: {
      //labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
              label: "Освещение в вентиляционной камере",
              fill: true,
              //backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgb(255, 99, 132)',
              data: 0 //createlist(60, 100, 0)//[0, 10, 5, 2, 20, 30, 45]
                  }]
            },

        // Configuration options go here
        options: Object.assign({}, commonOptions,{
              title:{
                  display: true,
                  text: "Освещение в вентиляционной камере",
                  fontSize: 18
                }
            })
        });

    //8. The pressure in the return pipe
    var pressure_ret_pipe = new Chart(pressure_ret_pipe, {
      // The type of chart we want to create
      type: 'line',
      // The data for our dataset
      data: {
      datasets: [{
            label: "Давление в обратном трубопроводе",
            fill: true,
            //backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: 0
                  }]
              },

      // Configuration options go here
      options: Object.assign({}, commonOptions,{
              title:{
              display: true,
              text: "Давление в обратном трубопроводе",
              fontSize: 18
              }
            })
        });

    //9. Pressure in the direct pipeline
    var pressure_direct_pipe = new Chart(pressure_direct_pipe, {
      // The type of chart we want to create
      type: 'line',
      // The data for our dataset
      data: {
      datasets: [{
            label: "Давление в прямом трубопроводе",
            fill: true,
            //backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: 0 //createlist(60, 100, 0)//[0, 10, 5, 2, 20, 30, 45]
                  }]
              },

      // Configuration options go here
      options: Object.assign({}, commonOptions,{
              title:{
              display: true,
              text: "Давление в прямом трубопроводе",
              fontSize: 18
              }
            })
        });

    var graphs = [outdoor_temp, exhaust_temp, supply_temp, h_exchanger_temp,
      after_h_exchanger_temp, ret_coolant_temperature, lighting, pressure_ret_pipe, pressure_direct_pipe];

      function addData(data){
        for(i=0; i < 9; i++){
          if(data[i]===undefined){
            data[i] = graphs[i].data.datasets.data.slice(-1);
          }
        }
        if(data){
          for(i=0; i < 9; i++){
            graphs[i].data.labels.push(new Date());
            graphs[i].data.datasets.forEach((dataset)=>{dataset.data.push(data[i])});
            console.log(graphs[i].data.datasets[0].data);
          }
        }
        if(updateCount > numberElements){
          console.log('updCount', updateCount, 'numEl', numberElements);
          for(i=0; i < 9; i++){
            graphs[i].data.labels.shift();
            console.log('data', graphs[i].data.datasets);
            graphs[i].data.datasets[0].data.shift();
          }
        }
        else{
          updateCount++;
        }
        for(i=0; i < 9; i++){
          graphs[i].update();
        }
      };

      function check_multiplicity(){
        if (count % json['sensor_1'].length == 0 & count != 0){
          count = 0;
        }
        else{
          count += 1;
        }
      }

      function get_slice(){
        var ret_val = [];
        for(i=0; i < 9; i++){
          ret_val.push(json['sensor_' + (i+1).toString()][count]);
        }
        return ret_val;
      }

      function updateData() {
        console.log("Update Data");
        //addData(createlist(10, 100, 0));
        //$.getJSON(createlist(1, 100, 0), addData);
        //console.log(createlist(7, 100, 0));
        data = get_slice();
        addData(data);
        check_multiplicity();
        console.log(count);
        setTimeout(updateData,updateInterval);
      };

      var count = 0;
      updateData();
  });
};
