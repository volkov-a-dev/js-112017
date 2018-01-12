'use strict';
import popupEvent from './popup';

const loadingMap = function () {
    ymaps.ready(init);
    let map,
        myPlacemark;

    function init() {
        let mapCenter = [55.755381, 37.619044],
            map = new ymaps.Map('map', {
                center: mapCenter,
                zoom: 9,
                controls: []
            });

        let customItemContentLayout = ymaps.templateLayoutFactory.createClass(
            '<h2 class=ballon__header>{{ properties.place|raw }}</h2>' +
            '<div class=ballon__body>' +
            '   <a href="#" data-coords={{properties.coords}} class="baloon__link">{{ properties.comment|raw }}</a> ' +
            '   <br/> {{properties.comment|raw}}</div>' +
            '<div class=ballon__footer>{{ properties.date|raw }}</div>'
        );

        let clusterer = new ymaps.Clusterer({
            groupByCoordinates: false,
            clusterHideIconOnBalloonOpen: false,
            geoObjectHideIconOnBalloonOpen: false,
            gridSize: 80,
            clusterDisableClickZoom: true,
            clusterOpenBalloonOnClick: true,
            clusterBalloonContentLayout: 'cluster#balloonCarousel',
            clusterBalloonItemContentLayout: customItemContentLayout,
            clusterBalloonPanelMaxMapArea: 0,
            clusterBalloonContentLayoutWidth: 200,
            clusterBalloonContentLayoutHeight: 130,
            clusterBalloonPagerSize: 5
        });

        map.geoObjects.add(clusterer);

        popupEvent(map)
        // let clusterer = new ymaps.Clusterer({
        //     clusterDisableClickZoom: true,
        //     clusterOpenBalloonOnClick: true,
        //     // Устанавливаем стандартный макет балуна кластера "Карусель".
        //     clusterBalloonContentLayout: 'cluster#balloonCarousel',
        //     // Устанавливаем собственный макет.
        //     clusterBalloonItemContentLayout: customItemContentLayout,
        //     // Устанавливаем режим открытия балуна.
        //     // В данном примере балун никогда не будет открываться в режиме панели.
        //     clusterBalloonPanelMaxMapArea: 0,
        //     // Устанавливаем размеры макета контента балуна (в пикселях).
        //     clusterBalloonContentLayoutWidth: 200,
        //     clusterBalloonContentLayoutHeight: 130,
        //     // Устанавливаем максимальное количество элементов в нижней панели на одной странице
        //     clusterBalloonPagerSize: 5
        //     // Настройка внешего вида нижней панели.
        //     // Режим marker рекомендуется использовать с небольшим количеством элементов.
        //     // clusterBalloonPagerType: 'marker',
        //     // Можно отключить зацикливание списка при навигации при помощи боковых стрелок.
        //     // clusterBalloonCycling: false,
        //     // Можно отключить отображение меню навигации.
        //     // clusterBalloonPagerVisible: false
        // });
    }                                                                                                                                                                                                                                                                                                                                                                                           
};

export default loadingMap;