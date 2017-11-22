/* ДЗ 1 - Функции */

/*
 Задание 1:

 Функция должна принимать один аргумент и возвращать его
 */
function returnFirstArgument(arg) {
    return arg
}

/*
 Задание 2:

 Функция должна принимать два аргумента и возвращать сумму переданных значений
 Значение по умолчанию второго аргумента должно быть 100
 */
function defaultParameterValue(a, b) {
  if (b) {
      return a + b;
  } else {
      return a + 100;
  }
}

/*
 Задание 3:

 Функция должна возвращать все переданные в нее аргументы в виде массива
 Количество переданных аргументов заранее неизвестно
 */
function returnArgumentsArray() {
    let argumentArray = [];

    if (arguments.length > 0) {
        // console.log('arguments.length 1 ', arguments.length)
        for (let i = 0; i <= arguments.length; i++) {
            argumentArray.push(arguments[i])
        }
        // console.log('test', argumentArray);
    }
    // console.log('arguments.length 2 ', arguments.length)
    // console.log('array', argumentArray)

    return argumentArray;
}

/*
 Задание 4:

 Функция должна принимать другую функцию и возвращать результат вызова переданной функции
 */
function returnFnResult(fn) {
    return fn();
}

/*
 Задание 5:

 Функция должна принимать число (значение по умолчанию - 0) и возвращать функцию (F)
 При вызове F, переданное число должно быть увеличено на единицу и возвращено из F
 */

function returnCounter(number) {
    let num = 0;

    if (number > 0)
        num = number;

    return function F() {
        return num = num + 1;
    };
}

/*
 Задание 6 *:

 Функция должна принимать другую функцию (F) и некоторое количество дополнительных аргументов
 Функция должна привязать переданные аргументы к функции F и вернуть получившуюся функцию
 */
function bindFunction(fn) {
    return F;
}

function F(){
}

export {
    returnFirstArgument,
    defaultParameterValue,
    returnArgumentsArray,
    returnFnResult,
    returnCounter,
    bindFunction
}
