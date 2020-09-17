require('intersection-observer')
import lottie from "lottie-web"

export default class anim {
  constructor(el) {
    let animEl = el

    let bodymovinRef = lottie.loadAnimation({
      container: animEl, // the dom element that will contain the animation
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: WPJS.assetsDirectory + 'anims/' + 'data.json' // the path to the animation json
    });

    let observer = new IntersectionObserver(entry => {
      if (entry[0].intersectionRatio > 0) {
        bodymovinRef.play()
      }
    }, {
      threshold: 0.5
    });

    observer.observe(animEl)

  }
}
