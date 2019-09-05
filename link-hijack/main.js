var links = [].slice.apply(document.getElementsByTagName('a'));

links.forEach(function(link) {

  link.addEventListener('click', function(event) {
    event.preventDefault();
  });
});
