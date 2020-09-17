import Flickity from 'flickity'
require('flickity-imagesloaded')


export default class galleryslider {
  constructor(el) {

    let cells = el.getElementsByClassName('carousel-cell')

    if(cells.length > 1) {
      var flkty = new Flickity( el, {
        draggable: true,
        pageDots: false,
        imagesLoaded: true,
        prevNextButtons: true,
        wrapAround: true
      });
    }





  }
}
