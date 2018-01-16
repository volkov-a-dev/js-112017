import '../style/main.scss';
import positionClick from './module/click-window';

const popupTemplate = require('./../components/testimonials.hbs');
let myMap;
let clusterer;
let testimonials = [];

let yandexMap = document.querySelector('#map');
let popup = document.querySelector('.popup');
let popupForm = popup.querySelector('.popup__form-testimonials');
let testimonialsBlock = popup.querySelector('.popup__testimonials');
let popupFormName = popupForm.querySelector('.popup__form-input[name=name]');
let popupFormPlace = popupForm.querySelector('.popup__form-input[name=place]');
let popupFormMessage = popupForm.querySelector('.popup__form-textarea');
let closePopupBtn = document.querySelector('.popup__header-close')
const submitForm = document.querySelector('.popup__form-testimonials');

ymaps.ready(init);

function init(){
    myMap = new ymaps.Map ("map", {
        center: [47.096022, 37.548734],
        zoom: 12
    },{
        minZoom:8,
        maxZoom:18
    });

    myMap.controls.add('zoomControl', { left: 5, top: 5 });
    myMap.behaviors.enable('scrollZoom');
    myMap.behaviors.disable('dblClickZoom');

    let customItemContentLayout = ymaps.templateLayoutFactory.createClass(
        '<h2 class=ballon__header> {{ properties.place|raw }}</h2>' +
        '<div class=ballon__body>' +
        '   <a href="#" data-coords={{properties.coords}} class="baloon__link">{{ properties.place|raw }}</a> ' +
        '   <br/> {{properties.comment|raw}}</div>' +
        '<div class=ballon__footer>{{ properties.date|raw }}</div>'
    );

    clusterer = new ymaps.Clusterer({
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

    myMap.geoObjects.add(clusterer);

    myMap.events.add('click', function (e) {
        myMap.balloon.close();
        if (popup.style.opacity == 1) {
            closePopup();
            return;
        }

        let coords = e.get('coords');
        popup.setAttribute('data-cord', coords);
        openPopup(coords, e)
    });
    closePopupBtn.addEventListener('click', closePopup);
    yandexMap.addEventListener('click', function(e) {
        let link = e.target;

        if (link.classList.contains('baloon__link')) {
            let coords = link.dataset.coords.split(','),
                top = e.pageY,
                left = e.pageX;

            myMap.balloon.close();

            openPopup(coords, e, [top, left])
        }
    });
    clusterer.events.add('click', function (e) {
        let object = e.get('target');

        if (object.options.getName() === 'geoObject') {
            let coords = object.geometry.getCoordinates();

            openPopup(coords, e)
        }
    });

    function filterArray (coords) {
        let popupObject = [];

        testimonialsBlock.innerHTML = '';
        for (let i = 0; i < testimonials.length; i++) {

            if (testimonials[i].coords[0] === coords[0] && testimonials[i].coords[1] === coords[1]) {
                popupObject.push(testimonials[i])
            }
        }
        return popupObject
    }
    function openPopup(coords, e, array) {

        let popupObject = filterArray(coords);

        testimonialsBlock.innerHTML = popupTemplate(popupObject);

        console.log(popupObject)

        ymaps.geocode(coords).then(function (res) {
            let firstGeoObject = res.geoObjects.get(0);
            console.log('reeererer', res)
            let iconCaption = [
                firstGeoObject.getCountry(), firstGeoObject.getLocalities(), firstGeoObject.getAddressLine()
            ].filter(Boolean).join(' ');

            let clickPosituin = positionClick(e);

            document.querySelector('.popup__header-text ').innerHTML = '';
            document.querySelector('.popup__header-text ').innerHTML = iconCaption;

            if (clickPosituin) {
                document.querySelector('.popup').style.left = `${clickPosituin[1]}px`;
                document.querySelector('.popup').style.top = `${clickPosituin[0]}px`;
                document.querySelector('.popup').style.opacity = 1;
            }
        });

        if (array) {
            document.querySelector('.popup').style.left = `${array[1]}px`;
            document.querySelector('.popup').style.top = `${array[0]}px`;
            document.querySelector('.popup').style.opacity = 1;
        }
    }
    (function(){
        submitForm.addEventListener('submit', function (e) {
            e.preventDefault();
            e.stopPropagation();

            let coords = popup.getAttribute('data-cord').split(',');
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

            popupFormName.value = '';
            popupFormPlace.value = '';
            popupFormMessage.value = '';

            addPlacemark(coords, myMap, clusterer, comment);
            testimonials.push(comment);

            let popupObject = filterArray(coords);

            testimonialsBlock.innerHTML = popupTemplate(popupObject);
        })
    })();
    function closePopup(e) {
        myMap.balloon.close();
        if (e) {
            e.preventDefault();
        }

        popup.style.left = '-9999px';
        popup.style.opacity = 0;
    }
}

function addPlacemark(coords, map, clusterer, content) {

    let place = new ymaps.Placemark(coords, {
        coords: coords,
        place: content.place,
        comment: content.message,
        date: content.dataMessage
    });

    map.geoObjects.add(place);
    clusterer.add(place);
}