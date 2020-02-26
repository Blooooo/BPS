window.onload = function(){
  //Configuration variables
  var updateInterval = 1000 //in ms
  var numberElements = 60;

  //Globals
  var updateCount = 0;

  // Chart Objects
  var temp_out = "temperature_out";
  var temp_in = "temperature_in";
  //var ctx = document.getElementById('myChart').getContext('2d');

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
  var temp_out = new Chart(temp_out, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
    //labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
        label: 'Температура снаружи',
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
            text: "Температура снаружи",
            fontSize: 18
          }
        })
    });

  var temp_in = new Chart(temp_in, {
    // The type of chart we want to create
    type: 'line',
    // The data for our dataset
    data: {
    //labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
        label: "Температура внутри",
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
            text: "Температура внутри",
            fontSize: 18
          }
        })
    });

    function addData(data){
      if(data[0] == 0){
        return;
      }
      if(data){
        temp_out.data.labels.push(new Date());
        temp_out.data.datasets.forEach((dataset)=>{dataset.data.push(data[0])});

        temp_in.data.labels.push(new Date());
        temp_in.data.datasets.forEach((dataset)=>{dataset.data.push(data[1])});
      }
      if(updateCount > numberElements){
        temp_out.data.labels.shift();
        temp_out.data.datasets[0].data.shift();

        temp_in.data.labels.shift();
        temp_in.data.datasets[0].data.shift();
      }
      else{
        updateCount++;
      }
      temp_out.update();
      temp_in.update();
    };

    function get_slice(index){
      return [sensors['sensor_1'][index],
              sensors['sensor_2'][index]]
    }

    function updateData() {
      console.log("Update Data");
      addData(createlist(10, 100, 0));
      //$.getJSON(createlist(1, 100, 0), addData);
      //console.log(createlist(7, 100, 0));
      //addData(get_slice(count % data_shape))
      setTimeout(updateData,updateInterval);
    };

    /*var sensors = $.getJSON("sensors_file.json", function(json){
      console.log('Success');
    });
    var count = 0;//,*/
        //data_shape = sensors["sensor_1"].length;
    updateData();
}
