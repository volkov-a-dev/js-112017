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


    }

};

export default loadingMap;