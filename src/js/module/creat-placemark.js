'use strict';

const creatPlacemark = function (coords) {
    const submitForm = document.querySelector('.popup__form-submit');

    submitForm.addEventListener('click', function (e) {
        e.preventDefault();
        console.log(coords[0], coords[1])
        let placemark = new ymaps.Placemark([coords[0], coords[1]], {
            balloonContent: 'цвет <strong>голубой</strong>',
            iconCaption: 'teks'
        }, {
            preset: 'islands#blueCircleDotIconWithCaption',
            iconCaptionMaxWidth: '50'
        });

        console.log(map)
        console.log(placemark)

        /*
        map.geoObjects = > undefined =(
         */
        console.log(map.geoObjects)
        map.geoObjects.add(placemark);
        // geoMap.geoObjects.add(placemark);
        // console.log('creat!', coords)
    })

};

export default creatPlacemark;