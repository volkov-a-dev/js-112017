'use strict';

import deCode from './decode';
import creatPlacemark from './creat-placemark';

const hbsGet = require('../../components/popup.hbs');

const popupEvent = function(map) {
    map.events.add('click', function (e) {
        console.log(e, map.balloon.isOpen())
        if (!map.balloon.isOpen()) {
            console.log('click!')
            // async () => {
            let coords = e.get('coords');
            let adderes = deCode(coords)
            // console.log('---', adderes)
            console.log(coords)
            document.querySelector('#bx').innerHTML = hbsGet();
            creatPlacemark(coords);
            // }
        } else {
            map.balloon.close();
        }
    });
};

export default popupEvent;