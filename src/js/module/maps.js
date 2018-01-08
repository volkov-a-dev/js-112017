// import geoPosition from './geo-position';

const mapsInit = {
    initMaps () {
        console.log('start');
        mapsInit.renderedMaps();
        // console.log('start 2', navigator)
    },

    renderedMaps : async function () {
        console.log('async 1');
        let self = this;
        console.log('async 2')
        // await geoPosition();
        await mapsInit.loadingMaps();

    },


    loadingMaps () {
        ymaps.ready(init);
        let myMap,
            myPlacemark;

        function init() {
            myMap = new ymaps.Map("map", {
                center: [55.76, 37.64],
                zoom: 7
            });

            myPlacemark = new ymaps.Placemark([55.76, 37.64], {
                hintContent: 'Москва!',
                balloonContent: 'Столица России'
            });

            myMap.geoObjects.add(myPlacemark);
            mapsInit.mapsClick(myMap);

                // // Обработка события, возникающего при щелчке
                // // правой кнопки мыши в любой точке карты.
                // // При возникновении такого события покажем всплывающую подсказку
                // // в точке щелчка.
                // myMap.events.add('contextmenu', function (e) {
                //     myMap.hint.open(e.get('coords'), 'Кто-то щелкнул правой кнопкой');
                // });
                //
                // // Скрываем хинт при открытии балуна.
                // myMap.events.add('balloonopen', function (e) {
                //     myMap.hint.close();
                // });
        }
    },

    mapsClick (myMap) {
        // Обработка события, возникающего при щелчке
        // левой кнопкой мыши в любой точке карты.
        // При возникновении такого события откроем балун.
        myMap.events.add('click', function (e) {
            if (!myMap.balloon.isOpen()) {
                var coords = e.get('coords');

                console.log(coords)
                myMap.balloon.open(coords, {
                    contentHeader:'Событие!',
                    contentBody:'<p>Кто-то щелкнул по карте.</p>' +
                    '<p>Координаты щелчка: ' + [
                        coords[0].toPrecision(6),
                        coords[1].toPrecision(6)
                    ].join(', ') + '</p>',
                    contentFooter:'<sup>Щелкните еще раз</sup>'
                });
            }
            else {
                myMap.balloon.close();
            }
        });
    },
};


export default mapsInit;
