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

// Carousel jQuery.
$(document).ready(function(){
  $('.carousel').carousel({
    fullWidth: true,
    indicators: true
  });

  $(document).keydown(function(event){
    if(event.which == 39){
      $('.carousel').carousel('next')
    } else if (event.which == 37){
      $('.carousel').carousel('prev')
    }
  })
});

//  Character counter new.ejs
$(document).ready(function() {
  $("input[type='text'], input[type='password']").characterCounter();
});