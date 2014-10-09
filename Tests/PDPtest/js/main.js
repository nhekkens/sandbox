$( document ).ready(function() {

    // navigation
    $('.navigation li').on( 'click', function() {
      var target = $(this).children('ul');
      if ( target.hasClass('active') ) {
        target.removeClass('active');
      }
      else {
        target.addClass('active');
      }
    });

    // open image overlay.
    $('article figure').on( 'click', function() {
      $('#overlay').fadeIn();
    });

    // close image overlay.
    $('#overlay .close').on( 'click', function() {
      $('#overlay').fadeOut();
    });
});
