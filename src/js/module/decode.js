'use strict';

import creatPlacemark from './creat-placemark';

const deCode = function (map, coords, positionClick) {
    ymaps.geocode(coords).then(function (res) {
        let firstGeoObject = res.geoObjects.get(0);
        let iconCaption = [
            firstGeoObject.getCountry(), firstGeoObject.getLocalities(), firstGeoObject.getAddressLine()
        ].filter(Boolean).join(' ');


        document.querySelector('.popup__header-text ').innerHTML = '';
        document.querySelector('.popup__header-text ').innerHTML = iconCaption;
        document.querySelector('.popup').style.left = `${positionClick[1]}px`;
        document.querySelector('.popup').style.top = `${positionClick[0]}px`;
        document.querySelector('.popup').style.opacity = 1;

        console.log('map, coords',map, coords)
        creatPlacemark(map, coords);

    });
};

export default deCode;