$( document ).ready(function() {
  var currentPos = 0,
      upTarget = $('#up'),
      nextPos = 0,
      downTarget = $('#down'),
      upTargetSlide = $('#up .slide'),
      downTargetSlide = $('#down .slide'),
      upSlideCount = upTargetSlide.length,
      windowHeight = $(window).height(),
      windowWidth = $(window).width(),
      windowHeight = $(window).height(),
      halfWindowWidth = windowWidth / 2,
      dimensions = 'width: ' + halfWindowWidth + 'px; height: ' + windowHeight + 'px;';

  $('.slide').each(function() {
    $(this).attr( 'style', dimensions );
  });

  upTarget.attr( 'style', 'bottom: ' + windowHeight + 'px;' );
  downTarget.attr( 'style', 'top: ' + windowHeight + 'px;' );

  $('body').swipe( {
    swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
      if ( direction === 'up') {
        if ( $('.l'+currentPos).hasClass('active') || $('.r'+currentPos).hasClass('active')) {
          changePos( 'up' );
        }
        if ( currentPos == 0 ) {
          changePos( 'up' );
        }
      }
      if ( direction === 'down') {
        changePos( 'down' );
      }
      event.preventDefault;
    },threshold: 50
  });

  function changePos( increment ) {
    if ( increment === 'up' ) {
      nextPos = currentPos + 1;
      if (nextPos > (upSlideCount ) ) {
        nextPos = (upSlideCount );
      }
    }
    if ( increment === 'down' ) {
      nextPos = currentPos - 1;
      if (nextPos < 0) {
        nextPos = 0;
      }
    }
    currentPos = nextPos;
    if ( currentPos === 0 ) {
      position = windowHeight;
      $('#intro').fadeIn();
    }
    if ( currentPos === 1 ) {
      position = 0;
      $('#choose').fadeIn();
      $('#intro').fadeOut();
    }
    if ( currentPos === 2 ) {
      position = 0 - windowHeight;
      $('#choose').fadeIn();
    }
    var upPosition = 'bottom: ' + position + 'px;',
        downPosition = 'top: ' + position + 'px;';
    upTarget.attr( 'style', upPosition );
    downTarget.attr( 'style', downPosition );
  }

  $('.choose').swipe( {
    tap:function(event, target) {

      var iDx = $('.container').indexOf(target);

      console.log(iDx);

      if ( $('.r1').hasClass('active') ) {
        $('.r1').toggleClass('active');
        $(this).toggleClass('active');
      } else {
        $(this).toggleClass('active');
      }
    }
  });



  $('.r1').swipe( {
    tap:function(event, target) {
      if ( $('.l1').hasClass('active') ) {
        $('.l1').toggleClass('active');
        $(this).toggleClass('active');
      } else {
        $(this).toggleClass('active');
      }
    }
  });
  $('.l2').swipe( {
    tap:function(event, target) {
      if ( $('.r2').hasClass('active') ) {
        $('.r2').toggleClass('active');
        $(this).toggleClass('active');
      } else {
        $(this).toggleClass('active');
      }
    }
  });
  $('.r2').swipe( {
    tap:function(event, target) {
      if ( $('.l2').hasClass('active') ) {
        $('.l2').toggleClass('active');
        $(this).toggleClass('active');
      } else {
        $(this).toggleClass('active');
      }
    }
  });

  var images = [ 'one.jpg', 'two.jpg', 'three.jpg' ],
      index = 0;
  setInterval(change_up, 3000);
  function change_up(){
    index = (index + 1 < images.length) ? index + 1 : 0;
    $('#intro').css('background-image', 'url('+ images[index] + ')')
  }
});
