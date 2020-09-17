import Flickity from 'flickity'
require('flickity-imagesloaded')
// Import modidied Instafeed (it changes the HTML + adds a completion callback, which we then use to initialise Flickity)
require('../vendor/instafetch.js')


export default class Instagram {
  constructor(el) {
    let accessToken = "5564455544.1677ed0.d3c9d4a4650e4acb80f701bbf0b1b9f0"

    if (!window.Promise) {
      window.Promise = Promise;
    }


    // Initialize Instafeed.js
    let feed = instafetch.init({
      accessToken: accessToken,
      target: 'instafetch',
      numOfPics: 10,
      caption: true
    }).then(() => {
      // Then on complete, run flickity...
      var flkty = new Flickity( el, {
        cellAlign: 'center',
        wrapAround: true,
        adaptiveHeight: false,
        imagesLoaded: true,
        draggable: true,
        pageDots: false
      });
    })


  }
}
