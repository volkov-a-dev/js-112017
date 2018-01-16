// import geoPosition from './geo-position';
// import deCode from './decode';
import loadingMap from './loading-map';

const mapsInit = {
    initMaps () {
        mapsInit.renderedMaps();
    },

    renderedMaps : async function () {
        await loadingMap();
    },
};

export default mapsInit;