document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems);
});


document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.fixed-action-btn');
  var instances = M.FloatingActionButton.init(elems, {
    direction: 'left',
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

$(document).ready(function() {
  $("input[name='topic'], input[name='choice1'],input[name='choice2'],input[name='choice3']").characterCounter();
});

// var instance = M.Carousel.init({
//   fullWidth: true,
//   indicators: true
// });

// Or with jQuery

// $(document).ready(function(){
//   $('.sidenav').sidenav();
// });