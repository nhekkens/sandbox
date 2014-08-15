$( document ).ready(function() {
  var currentPos = 0,
    upTarget = $('#up'),
    nextPos = 0,
    downTarget = $('#down'),
    upTargetSlide = $('#up .slide'),
    downTargetSlide = $('#down .slide'),
    upSlideCount = upTargetSlide.length,
    windowHeight = $(window).height();

  function calcWindowDimensions() {
    var windowWidth = $(window).width(),
      windowHeight = $(window).height(),
      halfWindowWidth = windowWidth / 2;
    setDimensions( halfWindowWidth, windowHeight );
  };

  // Set the height and width of the divs
  function setDimensions( windowWidth, windowHeight ) {
    var dimensions = 'width: ' + windowWidth + 'px; height: ' + windowHeight + 'px;', // line-height: ' + windowHeight + 'px;'
      $target = $('.slide');
    var count = $target.length;
    // console.log(count);
    $target.each(function() {
      $(this).attr( 'style', dimensions );
    });
  };

  var upInitPos = 'bottom: ' + windowHeight + 'px;';
  upTarget.attr( 'style', upInitPos );
  var downInitPos = 'top: ' + windowHeight + 'px;';
  downTarget.attr( 'style', downInitPos );

  // Incase of resize, recall
  $(window).on( 'resize orientationchange', function(event) {
    console.log(event);
    calcWindowDimensions();
  });

  // init
  calcWindowDimensions();

  $('body').swipe( {
    //Generic swipe handler for all directions
    swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
      console.log("You swiped " + direction );
      if ( direction === 'up') {
        if ( $('.l'+currentPos).hasClass('active') || $('.r'+currentPos).hasClass('active')) {
          console.log('valid');
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
    },
    threshold: 50
  });

  function changePos( increment ) {
    console.log('Cpos: ' + currentPos + 'nPos: ' + nextPos );
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
    console.log('Cpos after: ' + currentPos);
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
    if ( currentPos === 3 ) {
      position = 0 - ( windowHeight * 2 );

      $('#choose').fadeOut();
    }
    if ( currentPos === 4 ) {
      position = 0 - ( windowHeight * 3 );
    }
    if ( currentPos === 5 ) {
      position = 0 - ( windowHeight * 4 );
    }
    if ( currentPos === 6 ) {
      position = 0 - ( windowHeight * 5 );
    }
    var upPosition = 'bottom: ' + position + 'px;',
        downPosition = 'top: ' + position + 'px;';
    upTarget.attr( 'style', upPosition );
    downTarget.attr( 'style', downPosition );
  }

  $('.l1').swipe( {
    tap:function(event, target) {
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

  // START IMAGES
  var images = [
    'one.jpg',
    'two.jpg',
    'three.jpg'
  ];

  var index = 0;
  setInterval(change_up, 3000);
  function change_up(){
    index = (index + 1 < images.length) ? index + 1 : 0;
    $('#intro').css('background-image', 'url('+ images[index] + ')')
  }
});
