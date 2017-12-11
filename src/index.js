/* ДЗ 7.1 - BOM */

/**
 * Функция должна создавать окно с указанным именем и размерами
 *
 * @param {number} name - имя окна
 * @param {number} width - ширина окна
 * @param {number} height - высота окна
 * @return {Window}
 */
function createWindow(name, width, height) {
    let style = "width= "+ width +",height="+ height+ " ";
    //to do array param - 3
    return window.open('', name, style)
}

/**
 * Функция должна закрывать указанное окно
 *
 * @param {Window} window - окно, размер которого надо изменить
 */
function closeWindow(window) {
    return window.close()
}

/**
 * Функция должна создавать cookie с указанными именем и значением
 *
 * @param name - имя
 * @param value - значение
 */
function createCookie(name, value) {
    let item = name + '=' + value;

    document.cookie = item;
}

/**
 * Функция должна удалять cookie с указанным именем
 *
 * @param name - имя
 */
function deleteCookie(name) {
    let cookie_date = new Date ( );
    document.cookie = name += "=; expires=" + cookie_date.toGMTString();
}

export {
    createWindow,
    closeWindow,
    createCookie,
    deleteCookie
};
