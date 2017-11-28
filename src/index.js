/* ДЗ 3 - работа с массивами и объеектами */

/*
 Задача 1:
 Напишите аналог встроенного метода forEach для работы с массивами
 */
function forEach(array, fn) {
    for (let i in array) {
        if (array[i]) {
            fn(array[i], [i], array)
        }
    }

    return array;
}

/*
 Задача 2:
 Напишите аналог встроенного метода map для работы с массивами
 */
function map(array, fn) {
    let copyArray = [];

    for (let i in array) {
        if (array[i]) {
            copyArray.push(fn(array[i], [i], array))
        }
    }

    return copyArray
}

/*
 Задача 3:
 Напишите аналог встроенного метода reduce для работы с массивами
 */
function reduce(array, fn, initial) {
    let i = 0;

    if (!initial) {
        initial = array[0];
        i = 1;
    }

    for (i; i < array.length; i++) {
        initial = fn(initial, array[i], [i], array)
    }

    return initial
}

/*
 Задача 4:
 Функция принимает объект и имя свойства, которое необходиом удалить из объекта
 Функция должна удалить указанное свойство из указанного объекта
 */
function deleteProperty(obj, prop) {
    delete obj[prop];

    return obj
}

/*
 Задача 5:
 Функция принимает объект и имя свойства и возвращает true или false
 Функция должна проверить существует ли укзаанное свойство в указанном объекте
 */
function hasProperty(obj, prop) {
    if (prop in obj) {
        return true;
    }

    return false
}

/*
 Задача 6:
 Функция должна получить все перечисляемые свойства объекта и вернуть их в виде массива
 */
function getEnumProps(obj) {
    return Object.keys(obj)
}

/*
 Задача 7:
 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистра и вернуть в виде массива
 */
function upperProps(obj) {
    let array = [];

    for (let i in obj) {
        if (i) {
            array.push(i.toUpperCase())
        }
    }

    return array
}

/*
 Задача 8 *:
 Напишите аналог встроенного метода slice для работы с массивами
 */
function slice(array, from, to) {
    let newArray = [];
    let start = (from < 0) ? from + array.length : from;
    let end = (to < 0) ? to + array.length : to;

    if (!start) {
        start = 0;
    }

    if (!end) {
        end = array.length;
    }

    if (from === 0 && to === 0) {
        return newArray;
    }

    for (let i = 0; i < array.length; i++) {
        if (i >= start && i < end ) {
            newArray.push(array[i])
        }
    }

    return newArray
}

/*
 Задача 9 *:
 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
    return new Proxy(obj, {
        set(target, property, value) {
            return target[property] = value * value;
        }
    })
}

export {
    forEach,
    map,
    reduce,
    deleteProperty,
    hasProperty,
    getEnumProps,
    upperProps,
    slice,
    createProxy
};
