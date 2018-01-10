// import geoPosition from './geo-position';
// import deCode from './decode';
import loadingMap from './loading-map';

const mapsInit = {
    initMaps () {
        mapsInit.renderedMaps();
    },

    renderedMaps : async function () {
        console.log('async 1');
        let self = this;
        console.log('async 2')
        await loadingMap();
    },
    // Определяем адрес по координатам (обратное геокодирование).
};

export default mapsInit;