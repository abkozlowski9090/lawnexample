import Flickity from 'flickity'
require('flickity-imagesloaded')

export default class reviewsslider {
  constructor(el) {

    var flkty = new Flickity( el, {
      cellAlign: 'left',
      contain: true,
      fade: true,
      wrapAround: true,
      adaptiveHeight: false,
    });
  }
}
