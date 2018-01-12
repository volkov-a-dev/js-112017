'use strict';

import deCode from './decode';
import positionClick from './click-window';

const popupEvent = function(map) {
    map.events.add('click', function (e) {
        if (!map.balloon.isOpen()) {
            let coords = e.get('coords');
            console.log('clic open k' , coords)
            deCode(map, coords, positionClick(e))

        } else {
            console.log('clic clse k')

            map.balloon.close();
        }
    });

    document.querySelector('.main-container').addEventListener('click', function (e) {

        if (e.target.closest('.popup__header-close-svg')) {
            e.preventDefault();
            document.querySelector('.popup').style.left = '-999999px';
            document.querySelector('.popup').style.opacity = 0;
        }
    })
};

export default popupEvent;