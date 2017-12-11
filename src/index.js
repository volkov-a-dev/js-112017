/* ДЗ 6.1 - Асинхронность и работа с сетью */

/**
 * Функция должна создавать Promise, который должен быть resolved через seconds секунду после создания
 *
 * @param {number} seconds - количество секунд, через которое Promise должен быть resolved
 * @return {Promise}
 */
function delayPromise(seconds) {
    return new Promise((resolve, reject) => {
        setTimeout(function() {
            resolve();
        }, seconds*1000)
    });
}

/**
 * Функция должна вернуть Promise, который должен быть разрешен массивом городов, загруженным из
 * https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * Элементы полученного массива должны быть отсортированы по имени города
 *
 * @return {Promise<Array<{name: String}>>}
 */
function loadAndSortTowns() {
    return new Promise((resolve, reject) => {
        const requestM = new XMLHttpRequest();
        requestM.open('get', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json');
        requestM.send();
        requestM.addEventListener('progress', function () {
            if (requestM.status === 200) {
                console.log(JSON.parse(requestM.response));
                resolve(JSON.parse(requestM.response).sort((a, b) => {
                    if (a.name > b.name) {
                        return 1;
                    }

                    if (a.name < b.name) {
                        return -1;
                    }

                    return 0;
                }))
            } else {
                reject();
            }
        })
    })
}

export {
    delayPromise,
    loadAndSortTowns
};
