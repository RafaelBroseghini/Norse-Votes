// Sidenav header.ejs
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems);
});

// Floating Action Button header.ejs
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.fixed-action-btn');
  var instances = M.FloatingActionButton.init(elems, {
    direction: 'left',
    hoverEnabled: false
  });
});

// Carousel index.ejs
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.carousel');
  var instance = M.Carousel.init(elems, {
    fullWidth: true
    // indicators: true
  });
});

//  Character counter new.ejs
$(document).ready(function() {
  $("input[name='topic'], input[name='choice1'],input[name='choice2'],input[name='choice3']").characterCounter();
});