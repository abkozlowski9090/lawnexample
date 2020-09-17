import Promise from 'promise-polyfill';
import fetchJsonp from 'fetch-jsonp';

//
// Variables
//

const instafetch = {};
const supports = !!document.querySelector && !!document.addEventListener;
let settings, checked, url, targetEl, article, a, figure, img, div, p;
const baseUrl = 'https://api.instagram.com/v1/users/self/media/recent/?access_token=';

// Default settings
const defaults = {
  accessToken: null,
  target: 'instafetch',
  numOfPics: 20,
  caption: false
};

//
// Methods
//

/**
 * A simple forEach() implementation for Arrays, Objects and NodeLists
 * @private
 * @param {Array|Object|NodeList} collection Collection of items to iterate
 * @param {Function} callback Callback function for each iteration
 * @param {Array|Object|NodeList} scope Object/NodeList/Array that forEach is iterating over (aka `this`)
 */
const forEach = (collection, callback, scope) => {
  if (Object.prototype.toString.call(collection) === '[object Object]') {
    for (const prop in collection) {
      if (Object.prototype.hasOwnProperty.call(collection, prop)) {
        callback.call(scope, collection[prop], prop, collection);
      }
    }
  } else {
    for (let i = 0, len = collection.length; i < len; i++) {
      callback.call(scope, collection[i], i, collection);
    }
  }
};

/**
 * Merge defaults with user options
 * @private
 * @param {Object} defaults Default settings
 * @param {Object} options User options
 * @returns {Object} Merged values of defaults and options
 */
const extend = (defaults, options) => {
  const extended = {};

  forEach(defaults, (value, prop) => {
    extended[prop] = defaults[prop];
  });
  forEach(options, (value, prop) => {
    extended[prop] = options[prop];
  });
  return extended;
};

/**
 * Check typeof of settings
 * @private
 * @param {Object} options Merged values of defaults and options
 * @returns {boolean} Return false if incorrect
 */
const checkSettings = options => {
  if (typeof options.accessToken !== 'string') {
    console.error('accessToken must be a string.');
    return false;
  }
  if (typeof options.target !== 'string') {
    console.error('target must be a string.');
    return false;
  }
  if (typeof options.numOfPics !== 'number') {
    console.error('numOfPics must be a number.');
    return false;
  }
  if (typeof options.caption !== 'boolean') {
    console.error('caption must be a boolean.');
    return false;
  }

  return true;
};

/**
 * Fetch Instagram API with settings
 * @private
 * @param {Object} options Merged values of defaults and options
 * @returns {Object} JSON data
 */
const fetchFeed = options => {
  url = `${baseUrl + options.accessToken}&count=${options.numOfPics}&callback=?`;

  if (!window.Promise) {
    window.Promise = Promise;
  }

  return new Promise(function (resolve, reject) {

    fetchJsonp(url).then(response => response.json()).then(json => {
      if (json.meta.code === 200) {
        displayFeed(json, options);
        resolve();
      } else {
        console.error(json.meta.error_message);
        reject("error");
      }
    }).catch(error => {
      console.error(error);
      reject("error");
    });

  })
};

/**
 * Display JSON data from fetch
 * @private
 * @param {Object} json JSON data
 * @returns Stop if no element, display if element
 */
const displayFeed = (json, options) => {
  targetEl = document.getElementById(options.target);
  if (!targetEl) {
    console.error(`No element with id="${options.target}" was found on the page.`);
    return;
  }

  json.data.forEach(data => {
    article = document.createElement('article');
    article.setAttribute("class", "carousel-cell");
    a = document.createElement('a');
    a.href = data.link;
    a.target = '_blank';
    a.setAttribute("class", "instagram-post");
    figure = document.createElement('figure');
    img = document.createElement('img');
    img.src = data.images.low_resolution.url;
    figure.appendChild(img);
    a.appendChild(figure);
    article.appendChild(a);

    if (options.caption && data.caption) {
      div = document.createElement('div');
      p = document.createElement('p');

      let span = document.createElement('span')
      span.innerHTML = data.likes.count;

      let heart = document.createElement('span')
      heart.className = "heart"
      p.appendChild(heart);
      p.appendChild(span);

      div.appendChild(p);

      p = document.createElement('p');
      p.innerHTML = data.caption.text;
      div.appendChild(p);

      p = document.createElement('p');
      var createdDate = new Date(0)
      createdDate.setUTCSeconds(data.created_time);
      var date = createdDate.getDate();
      var month = createdDate.getMonth(); //Be careful! January is 0 not 1
      var year = createdDate.getFullYear();
      p.innerHTML = date + "/" +(month + 1) + "/" + year;

      div.appendChild(p);
      a.appendChild(div);
    }

    targetEl.appendChild(article);
  });
};

/**
 * Destroy the current initialization
 * @public
 */
instafetch.destroy = () => {

  // If plugin isn't already initialized, stop
  if (!settings) {
    return;
  }

  // Reset varaibles
  settings = null;
  checked = null;
  url = null;
  targetEl = null;
  article = null;
  a = null;
  figure = null;
  img = null;
  div = null;
  p = null;
};

/**
 * Initialize Instafetch
 * @public
 * @param {Object} options User settings
 */
instafetch.init = options => {

  // Feature test
  if (!supports) {
    return;
  }

  // Destroy any existing initializations
  instafetch.destroy();

  // Variables
  settings = extend(defaults, options || {});

  // Do something...
  checked = checkSettings(settings);

  if (checked) {

    return new Promise(function (resolve, reject) {
      fetchFeed(settings).then(message => {
        resolve();
      })
    })
  }
};

//
// Public APIs
//

window.instafetch = instafetch;
