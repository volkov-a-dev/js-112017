import '../style/main.scss';
import mopsInit from './module/maps';

const mapsModule = {
    init () {
        mopsInit.initMaps();
    },

    // init: function () {
    //     ymaps.ready(init);
    //
    //     var myMap,
    //         myPlacemark;
    //
    //     function init() {
    //         myMap = new ymaps.Map("map", {
    //             center: [55.76, 37.64],
    //             zoom: 7
    //         });
    //
    //         myPlacemark = new ymaps.Placemark([55.76, 37.64], {
    //             hintContent: 'Москва!',
    //             balloonContent: 'Столица России'
    //         });
    //
    //         myMap.geoObjects.add(myPlacemark);
    //     }
    // }
};

window.onload = mapsModule.init();
