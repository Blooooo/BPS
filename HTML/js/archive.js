window.onload = function(){

  var name_dict = {
    sensor_1 : "Outdoor air temperature",
    sensor_2 : "The temperature of the exhaust air",
    sensor_3 : "The temperature of the supply air",
    sensor_4 : "The temperature of the heat exchanger",
    sensor_5 : "Temperature after heat exchanger",
    sensor_6 : "Return coolant temperature",
    sensor_7 : "Lighting in the vent.camera",
    sensor_8 : "The pressure in the return pipe",
    sensor_9 : "Pressure in the direct pipeline"
  }

  machine_obj = {
    machine_1 : [
      "002606",
      {
        sensor_1 : "002606_0_1",
        sensor_2 : "002606_0_2",
        sensor_3 : "002606_0_3",
        sensor_4 : "002606_0_4",
        sensor_5 : "002606_0_5",
        sensor_6 : "002606_0_6",
        sensor_7 : "002606_0_7",
        sensor_8 : "002606_0_8",
        sensor_9 : "002606_0_9"
      }],
    machine_2 : [
      "002609",
      {
        sensor_1 : "002609_0_1",
        sensor_2 : "002609_0_2",
        sensor_3 : "002609_0_3",
        sensor_4 : "002609_0_4",
        sensor_5 : "002609_0_5",
        sensor_6 : "002609_0_6",
        sensor_7 : "002609_0_7",
        sensor_8 : "002609_0_8",
        sensor_9 : "002609_0_9"
      }
  ]
  }



  // Что это блять за функция?
  function getChar(event){
    if(event.which ==null){
      if(event.keyCode<32) return null;
      return String.fromCharCode(event.keyCode)
    }

    if (event.which != 0 && event.charCode != 0){
      if (event.which < 32) return null;
      return String.fromCharCode(event.which)
    }
  }


  var date_from = document.getElementById('date_start'),
      date_to = document.getElementById('date_finish'),
      graph_type = document.getElementById('select_list_graph'),
      machine = document.getElementById('select_list_machine');

  // Hadling
  date_from.onchange = handler;
  date_to.onchange = handler;
  graph_type.onchange = handler;
  machine.onchange = handler;

  function handler(){

    // Проверка на наличие элемента на странице
    var element = document.getElementById('chipsets');
    if(element){
      element.remove();
    }

    if(!input_corr_check()) return;

    var deviceId = machine_obj[machine.value][0],
        sensorKey = machine_obj[machine.value][1][graph_type.value],
        start = (new Date(date_from.value)).getTime(),//'1575151200000',
        end = (new Date(date_to.value)).getTime();//'1575372052971';

    // From Date to Unix console.log((new Date("2019-12-03T11:00:00")).getTime());

    // Запрос на сервер
    var settings = {
      "url": "https://cloud.connected-bim.com/api/data/sensor?DeviceId="+ deviceId +"&SensorKey="+ sensorKey +"&Start="+ start +"&End="+ end +"&TimeFormat=unix",
      "method": "GET",
      "timeout": 0,
      "headers": {
        "apiKey": "37a4a932-0248-4112-b27f-2c3196249b0f"
      },
    };

    $.ajax(settings).done(function (response) {
      // Парсинг данных
      var dict_values = parsing(response);
      console.log(dict_values);

       // Отрисовка элементов на странице
      let div_chipsets = document.createElement('div');
      div_chipsets.id = "chipsets";
      //document.body.append(div_chipsets);

      let div_sens = document.createElement('div');
      div_sens.className = "sensor";
      //document.getElementById("chipsets").append(div_chipsets);

      let canv = document.createElement('canvas');
      canv.id = name_dict[graph_type.value];
      //document.body.chipsets.sensor.append(div_chipsets);

      div_sens.appendChild(canv);
      div_chipsets.appendChild(div_sens);

      document.body.append(div_chipsets);

      console.log(name_dict[graph_type.value]);

      // Отрисовка графика
      var plot = name_dict[graph_type.value];//"Outdoor air temperature";

      var plot = new Chart(plot, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
        labels: dict_values.x,//labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'Температура наружного воздуха',
            fill: true,
            //backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data:  dict_values.y //createlist(60, 100, 0)//[0, 10, 5, 2, 20, 30, 45]
                  }]
              },

            // Configuration options go here
            options: {
              legend: {display : false},
              /*scales : {
                xAxes : [{
                  type: 'time',
                  time: {
                    min: date_from.value,
                    max: date_to.value,
                    unit: 'day'
                  }
                }]
              },*/
              title:{
                display: true,
                text: "Температура наружного воздуха",
                fontSize: 18
              }
            }

        });
        console.log(response.data);
      })
  }

function parsing(src){
  var x_array = [],
      y_array = [];
  src.data.forEach(function(item, i, src){
    x_array.push(item.dateTime);
    y_array.push(item.value);
  })

  var obj = {
    x : x_array.reverse(),
    y : y_array.reverse()
  }
  return obj;
}

// Проверка корректности вводных параметров
function input_corr_check(){
  if(date_to.value > date_from.value & graph_type.value != "" & machine.value != "") {return true;}
  return false;
}


  /*let response = fetch('https://cloud.connected-bim.com/api/data/sensor?DeviceId=002609&SensorKey=002609_0_3&Start=2019-12-01T09:19:15Z&End=2019-12-06T10:19:15Z&TimeFormat=UTC', {
  //method: 'PATCH',
  headers: {
    'apiKey': '37a4a932-0248-4112-b27f-2c3196249b0f'
  }
});*/

}
