import Flickity from 'flickity'
require('flickity-imagesloaded')
require('flickity-fade')


export default class gallery {
  constructor(el) {

    var carouselStatus = document.querySelector('.carousel-status');

    var flkty = new Flickity( el, {
      draggable: false,
      pageDots: false,
      imagesLoaded: true,
      prevNextButtons: true,
      wrapAround: true,
      fade: true,
    });

    function updateStatus() {
      var slideNumber = flkty.selectedIndex + 1;
      carouselStatus.textContent = slideNumber + '/' + flkty.slides.length;
      }
    updateStatus();

    flkty.on( 'select', updateStatus );


  }
}
