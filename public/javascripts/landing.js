document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems);
});


document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.fixed-action-btn');
  var instances = M.FloatingActionButton.init(elems, {
    direction: 'top',
    hoverEnabled: false
  });
});

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.carousel');
  var instance = M.Carousel.init(elems, {
    fullWidth: true
    // indicators: true
  });
});

// var instance = M.Carousel.init({
//   fullWidth: true,
//   indicators: true
// });

// Or with jQuery

// $(document).ready(function(){
//   $('.sidenav').sidenav();
// });