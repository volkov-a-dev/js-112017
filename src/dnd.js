/** Со звездочкой */
/**
 * Создать страницу с кнопкой
 * При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией
 * Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 * Запрощено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');

/**
 * Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 * Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 * Функция НЕ должна добавлять элемент на страницу
 *
 * @return {Element}
 */
function createDiv() {
    let div = document.createElement('div');
    let setting = {
        random(min, max) {
            return Math.floor(min + Math.random() * (max + 1 - min));
        },
        width() {
            return this.random(10, 100) + 'px'
        },
        height() {
            return this.random(10, 100) + 'px'
        },
        backgroundColor() {
            let letters = '0123456789ABCDEF';
            let color = '#';

            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }

            return color;
        },
        position() {
            let top = this.random(10, 100) + 'px';
            let left = this.random(10, 100) + 'px';

            return {
                'leftPosition': left,
                'topPosition': top
            }
        }
    };

    div.style.marginTop = '10px';
    div.style.position = 'absolute';
    div.classList.add('draggable-div');
    div.style.width = setting.width();
    div.style.height = setting.height();
    div.style.backgroundColor = setting.backgroundColor();
    div.style.top = setting.position().topPosition;
    div.style.left = setting.position().leftPosition;

    return div
}

/**
 * Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop
 *
 * @param {Element} target
 */
function addListeners(target) {
    target.onmousedown = () => {
        let moveAt = (e) => {
            target.style.left = e.pageX - target.offsetWidth / 2 + 'px';
            target.style.top = e.pageY - target.offsetHeight / 2 + 'px';
        };

        document.onmousemove = e => moveAt(e);

        target.onmouseup = () => {
            document.onmousemove = null;
            target.onmouseup = null;
        }
    }
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    let div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации d&d
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
