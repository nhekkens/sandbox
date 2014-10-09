$( document ).ready(function() {

    // navigation
    $('main nav a').on( 'click', function( event ) {
      // prevent the default event
      event.preventDefault();

      // remove class active from nav links
      $('main nav a').removeClass('active');

      // add active to current link
      $(this).addClass('active');

      // get the coresponding article id
      var target = $(this).data('target');

      // remove the active and hide all articles.
      $('article').removeClass('active');

      // add active class to the desired article
      $(target).addClass('active');

    });
});
