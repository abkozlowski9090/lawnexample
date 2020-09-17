import './modules'
import svgSpriteInjector from 'svg-sprite-injector'
import detectIt from 'detect-it'
import lax from 'lax.js'
import SmoothScroll from 'smooth-scroll'

svgSpriteInjector(document.body)


let smoothScrollOffset = 65
let scroll = new SmoothScroll('[data-scroll]', {
  offset: smoothScrollOffset,
  speed: 600,
  updateURL: false,
  popstate: false,
})


// Collapse Nav
let scrollState = 0;

let scrollDetect = function(home, down) {
  // Current scroll position
  var currentScroll = scrollTop();
  if (scrollTop() === 0) {
    home();
  } else if (currentScroll > scrollState) {
    down();
  }
  // Set previous scroll position
  scrollState = scrollTop();
};

function downAction() {
  document.body.classList.add("collapse-header")
}

function homeAction() {
  document.body.classList.remove("collapse-header")
}

var scrollTop = function() {
	return window.scrollY;
};

if(!detectIt.hasTouch) {
  window.addEventListener("scroll", function() {
    scrollDetect(homeAction, downAction);
  });
}

window.onload = function() {
	if(!detectIt.hasTouch) {
		lax.setup() // init

		const updateLax = () => {
			lax.update(window.scrollY)
			window.requestAnimationFrame(updateLax)
		}

		window.requestAnimationFrame(updateLax)
	}
}
