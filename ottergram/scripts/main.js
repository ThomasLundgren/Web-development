var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';

function initializeEvents() {
  'use strict';
  var thumbnails = getThumbnailsArray();
  thumbnails.forEach(addThumbnailClickHandler);
}

function addThumbnailClickHandler(thumbnail) {
  'use strict';
  thumbnail.addEventListener('click', function(event) {
    event.preventDefault();
    setDetailsFromThumbnail(thumbnail);
  });
}

function getThumbnailsArray() {
  'use strict';
  var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  var thumbnailArray = [].slice.call(thumbnails);
  return thumbnailArray;
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
  return thumbnail.getAttribute('data-image-url');
}

function titleFromThumbnail(thumbnail) {
  'use strict';
  return thumbnail.getAttribute('data-image-title');
}

initializeEvents();
