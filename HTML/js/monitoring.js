/* Функция создает массив рандомных значений
*         заданного размера size
*/
function randlist(size){
  var list = [];
  for(var i = 0; i < size; i++){
    list.push(Math.random());
  }
  return list
}

/* Функция возвращает максимальное и минимальное
*         значение массива list
*/
function get_max_min(list){
  var arr_copy = list.slice().sort(),
      ret_arr = [arr_copy[0], arr_copy.pop()]
  return ret_arr
}

/* Функция масштабирует исходные значения массива
*  на заданный отрезок значений
*/
function max_min(list, max, min){
  var count = list.length,
      obj_min_max = get_max_min(list),
      list_min = obj_min_max[0],
      list_max = obj_min_max[1];

  for(var i = 0; i < count; i++){
    list[i] = (list[i] - list_min)/(list_max - list_min)*(max - min) + min;
  }
  return list
}

function createlist(size, max, min){
  return max_min(randlist(size), max, min)
}



/*var arr = randlist(3);
console.log(arr);
console.log(max_min(arr, 100, 50));*/
