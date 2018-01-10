'use strict';

const deCode = function (coords) {
    ymaps.geocode(coords).then(function (res) {
        let firstGeoObject = res.geoObjects.get(0);
        let iconCaption = [
            firstGeoObject.getCountry(), firstGeoObject.getLocalities(), firstGeoObject.getAddressLine()
        ].filter(Boolean).join(' ');
        return iconCaption
    });
};

export default deCode;