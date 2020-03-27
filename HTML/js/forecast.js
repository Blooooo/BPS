window.onload = function(){
  var button = document.getElementById('button_'),
      text = document.getElementById('input_date'),
      machine = document.getElementById('select_list_machine'),
      chipset = document.getElementById('select_list_graph');


  button.onclick = handler;

  function handler(){
    // Проверка значений
    if(!check_values()){
      return;
    }

    var xyz = 'kek';
    $.ajax({
        type: 'POST',
        url: "python_script.py",
        data: {param: xyz}, //passing some input here
        dataType: "text",
        success: function(response){
           output = response;
           alert(output);
        }
}).done(function(data){
    console.log(data);
    alert(data);
});


  }

  function check_values(){
    if (!check_number()){
      alert('Некорректно заполнено поле "период прогноза"!');
      return false;
    }
    if (machine.value == "" || chipset.value == "") {
      alert('Некорректно заполнены поля с выбором!');
      return false;
    }
    return true;
  }

  function check_number(){
    for(i=0; i < text.value.length; i++){
      if (!(text.value[i] >= '0' && text.value[i] <= '9')){
        return false;
      }
    }
    return true;
  }
}
