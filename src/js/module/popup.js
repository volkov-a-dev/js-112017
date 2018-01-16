'use strict';

import deCode from './decode';
import positionClick from './click-window';

const popup = document.querySelector('.popup');


const popupEvent = function(map) {
    map.events.add('click', function (e) {

        if (!popup.className.match('js-open')) {
            let coords = e.get('coords');

            deCode(map, coords, positionClick(e));
            popup.classList.add('js-open')

        } else {
            closePopup();
            map.balloon.close();
        }
    });

    document.querySelector('.main-container').addEventListener('click', function (e) {
        if (e.target.closest('.popup__header-close-svg')) {
            e.preventDefault();
            closePopup();

            return;
        }
    });

    function closePopup() {
        document.querySelector('.popup').style.left = '-999999px';
        document.querySelector('.popup').style.opacity = 0;
        popup.classList.remove('js-open')
    }
};

export default popupEvent;