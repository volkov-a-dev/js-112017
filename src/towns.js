/**
 * ДЗ 6.2 - Создать страницу с текстовым полем для фильтрации городов
 *
 * Страница должна предварительно загрузить список городов из
 * https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * и отсортировать в алфавитном порядке.
 *
 * При вводе в текстовое поле, под ним должен появляться список тех городов,
 * в названии которых, хотя бы частично, есть введенное значение.
 * Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.
 *
 * Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 * После окончания загрузки городов, надпись исчезает и появляется текстовое поле.
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 *
 * *** Часть со звездочкой ***
 * Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 * то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 * При клике на кнопку, процесс загруки повторяется заново
 */
import { loadAndSortTowns } from './index'
/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');

/**
 * Функция должна загружать список городов из https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * И возвращать Promise, которой должен разрешиться массивом загруженных городов
 *
 * @return {Promise<Array<{name: string}>>}
 */
function loadTowns() {
    return loadAndSortTowns();
}

/**
 * Функция должна проверять встречается ли подстрока chunk в строке full
 * Проверка должна происходить без учета регистра символов
 *
 * @example
 * isMatching('Moscow', 'moscow') // true
 * isMatching('Moscow', 'mosc') // true
 * isMatching('Moscow', 'cow') // true
 * isMatching('Moscow', 'SCO') // true
 * isMatching('Moscow', 'Moscov') // false
 *
 * @return {boolean}
 */
function isMatching(full, chunk) {
    return (full.toLowerCase().indexOf(chunk.toLowerCase()) !== -1) ? true : false;
}

let loadingBlock = homeworkContainer.querySelector('#loading-block');
let filterBlock = homeworkContainer.querySelector('#filter-block');
let filterInput = homeworkContainer.querySelector('#filter-input');
let filterResult = homeworkContainer.querySelector('#filter-result');
let townsPromise;

function dispBlock() {
    loadingBlock.style.display = 'none';
    filterBlock.style.display = 'block';
}

function createElement(text, elem, parent) {
    let element = document.createElement(elem);

    element.textContent = text;
    parent.appendChild(element);
}

filterInput.addEventListener('keyup', searchEvent);

function searchEvent(event) {
    dispBlock();
    let valInput = event.target.value.trim();

    if (valInput.length > 0) {
        loadTowns()
            .then(function (e) {
                let country = [];

                filterResult.innerHTML ='';
                e.forEach(function (item) {
                    if (isMatching(item.name, valInput)) {
                        createElement(item.name, 'div', filterResult);
                        country.push(item.name)
                    }
                });
                if (country.length == 0) {
                    createElement('Нечего не найдено', 'div', filterResult);
                }
            })

            .catch(function () {
                loadingBlock.style.display = 'none';
                filterBlock.style.display = 'block';
                filterInput.style.display = 'none';
                createElement('Повторить', 'button', filterResult);searchEvent
                createElement('Не удалось загрузить города...', 'div', filterResult);
                document.querySelector('button').addEventListener('click', function() {
                    filterResult.innerHTML = '';
                    loadingBlock.style.display = 'block';
                    filterBlock.style.display = 'none';
                    searchEvent(event);
                })
            });
    } else {
        filterResult.innerHTML = '';
        filterInput.style.display = 'block';
    }
}

export {
    loadTowns,
    isMatching
};
