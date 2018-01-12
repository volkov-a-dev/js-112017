'use strict';

import marksFunObj from './marks-object';

let popup = document.querySelector('.popup');
let popupForm = popup.querySelector('.popup__form-testimonials');
let testimonialsBlock = popup.querySelector('.popup__testimonials');
let popupFormName = popupForm.querySelector('.popup__form-input[name=name]');
let popupFormPlace = popupForm.querySelector('.popup__form-input[name=place]');
let popupFormMessage = popupForm.querySelector('.popup__form-input');

const creatPlacemark = function (map, coords) {
    const submitForm = document.querySelector('.popup__form-testimonials');

    submitForm.addEventListener('submit', function (e) {
        e.preventDefault();
        e.stopPropagation();

        // console.log(coords[0], coords[1])
        let placemark = new ymaps.Placemark([coords[0], coords[1]], {
            balloonContent: 'цвет <strong>голубой</strong>',
            iconCaption: 'teks'
        }, {
            preset: 'islands#blueCircleDotIconWithCaption',
            iconCaptionMaxWidth: '50'
        });

        let comment = {};
        function formatDate(date) {
            return date < 10 ? '0' + date : date;
        }

        let name = popupFormName.value.trim();
        let place = popupFormPlace.value.trim();
        let message = popupFormMessage.value.trim();
        let data = new Date();
        let dataMessage =`${data.getFullYear()}.${formatDate(data.getMonth()+1)}.${formatDate(data.getDate())}`+
            ` ${formatDate(data.getHours())}:${formatDate(data.getMinutes())}:${formatDate(data.getSeconds())}`;

        comment = {
            coords,
            name,
            place,
            message,
            dataMessage
        };

        marksFunObj(comment)
        popupFormName.value = '';
        popupFormPlace.value = '';
        popupFormMessage.value = '';

        console.log('creat placemark', placemark)

        map.geoObjects.add(placemark);
    })

};

export default creatPlacemark;