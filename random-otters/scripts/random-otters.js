var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var URL_ATTRIBUTE = 'data-image-url';
var RANDOM_URL = 'https://media.giphy.com/media/olAik8MhYOB9K/giphy.gif';
var thumbnails = getThumbnailsArray();

function initializeEvents() {
  'use strict';

  thumbnails.forEach(addThumbnailClickHandler);
  setRandom();
}

function addThumbnailClickHandler(thumbnail) {
  'use strict';
  thumbnail.addEventListener('click', function(event) {
    event.preventDefault();
    setDetailsFromThumbnail(thumbnail);
    if (event.currentTarget.getAttribute(URL_ATTRIBUTE) == RANDOM_URL) {
      thumbnails.forEach(resetUrl);
      setRandom();
    }
  });
}

function getThumbnailsArray() {
  'use strict';
  var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  var thumbnailArray = [].slice.call(thumbnails);
  return thumbnailArray;
}

function setRandom() {
  'use strict'
  var randomIndex = Math.floor(Math.random() * thumbnails.length);
  thumbnails[randomIndex].setAttribute(URL_ATTRIBUTE,
    RANDOM_URL);
}

function resetUrl(thumbnail) {
  'use strict'
  thumbnail.setAttribute(URL_ATTRIBUTE, thumbnail.getAttribute('href'));
}

function setDetailsFromThumbnail(thumbnail) {
  'use strict';
  setDetails(imageFromThumbnail(thumbnail), titleFromThumbnail(thumbnail));
}

function setDetails(imageUrl, titleText) {
  'use strict';
  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  detailImage.setAttribute('src', imageUrl);

  var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
  detailTitle.textContent = titleText;
}

function imageFromThumbnail(thumbnail) {
  'use strict';
  return thumbnail.getAttribute(URL_ATTRIBUTE);
}

function titleFromThumbnail(thumbnail) {
  'use strict';
  return thumbnail.getAttribute('data-image-title');
}

initializeEvents();
