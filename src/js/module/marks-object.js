
// const = require('../../components/popup.hbs');
const testimonialsAll = require('../../components/testimonials.hbs');
let allTestimonials = [];

const marksFunObj = function(obj) {


    allTestimonials.push(obj);

    document.querySelector('.popup__testimonials').innerHTML = testimonialsAll(allTestimonials)

console.log('array', allTestimonials)
    return allTestimonials
    // return {
    //     set: setMarker(),
    //     get: getMarker()
    // }
};

export default marksFunObj;
