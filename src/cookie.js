/**
 * ДЗ 7.2 - Создать редактор cookie с возможностью фильтрации
 *
 * На странице должна быть таблица со списком имеющихся cookie:
 * - имя
 * - значение
 * - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)
 *
 * На странице должна быть форма для добавления новой cookie:x`
 * - имя
 * - значение
 * - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)
 *
 * Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено
 *
 * На странице должно быть текстовое поле для фильтрации cookie
 * В таблице должны быть только те cookie, в имени или значении которых есть введенное значение
 * Если в поле фильтра пусто, то должны выводиться все доступные cookie
 * Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 * Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 * то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена
 *
 * Для более подробной информации можно изучить код тестов
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */
import { deleteCookie } from './index'
/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');
let filterNameInput = homeworkContainer.querySelector('#filter-name-input');
let addNameInput = homeworkContainer.querySelector('#add-name-input');
let addValueInput = homeworkContainer.querySelector('#add-value-input');
let addButton = homeworkContainer.querySelector('#add-button');
let listTable = homeworkContainer.querySelector('#list-table tbody');

filterNameInput.addEventListener('keyup', function() {

    let array = listCookes();
    let searchText = filterNameInput.value;
    let regex = new RegExp(searchText.split(' ').join('|'));

    listTable.innerHTML = '';

    for (let prop in array) {
        let tr = document.createElement('tr');
        let name = prop;
        let val = array[prop];

        if ((name + ' ' + val).match(regex)) {
            tr.innerHTML = `<td>${name}</td><td>${val}</td><td><button id=${val}>удалить</button></td>`;
            listTable.appendChild(tr);
        }
    }
});

addButton.addEventListener('click', () => {
    let searchText = filterNameInput.value;
    let regex = new RegExp(searchText.split(' ').join('|'));
    let nameVal = addNameInput.value;
    let valVal = addValueInput.value ;
    listTable.innerHTML = '';

    if (searchText.length > 0) {
        if ((`${nameVal} ${valVal}`).match(regex)) {
            document.cookie = `${nameVal}=${valVal}`;
            console.log(document.cookie)
            viewCookes();
        } else {
            document.cookie = `${nameVal}=${valVal}`;
            let tr = document.createElement('tr');
            tr.innerHTML = `<td>${nameVal}</td><td>${valVal}</td><td><button id=${valVal}>Удалить</button></td>`;
            listTable.appendChild(tr);
        }
    } else {
        document.cookie = `${nameVal}=${valVal}`;
        viewCookes();
    }

});

function listCookes() {

    let a = document.cookie.split(';').reduce((prev, current) => {
        const [name, value] = current.split('=');

        prev[name] = value;

        return prev
    }, {});

    return a;
}

function viewCookes() {
    let getLists = listCookes();

    for (let prop in getLists) {
        let tr = document.createElement('tr');
        let name = prop;
        let val = getLists[prop];

        tr.innerHTML = `<td>${name}</td><td>${val}</td><td><button id=${val}>Удалить</button></td>`;
        listTable.appendChild(tr)
        tr.querySelector('button').addEventListener('click', function() {

            deleteCookie(name);
            document.querySelector('tbody').removeChild(this.closest('tr'));
        })
    }
}

viewCookes();