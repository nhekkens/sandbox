$( document ).ready(function() {

  var currentPos = 0;

  // Get width and height of the viewport
  function calcWindowDimensions() {

    var windowWidth = $(window).width(),
      windowHeight = $(window).height(),
      halfWindowWidth = windowWidth / 2;

    console.log( 'Height: ' + windowHeight + 'px --&-- Width: ' + windowWidth + 'px');

    setDimensions( halfWindowWidth, windowHeight );

  };

  // Set the height and width of the divs
  function setDimensions( windowWidth, windowHeight ) {

    var dimensions = 'width: ' + windowWidth + 'px; height: ' + windowHeight + 'px; line-height: ' + windowHeight + 'px;',
      $target = $('.slide');
    var count = $target.length;

    // console.log(count);
    $target.each(function() {

      $(this).attr( 'style', dimensions );

    });

  };

  var leftTarget = $('#left'),
      rightTarget = $('#right');
      leftTargetSlide = $('#left .slide'),
      rightTargetSlide = $('#right .slide'),
      leftSlideCount = leftTargetSlide.length,
      rightSlideCount = rightTargetSlide.length,
      windowHeight = $(window).height(),
      leftHeight = leftSlideCount * windowHeight;
      rightHeight = rightSlideCount * windowHeight;

  console.log( 'Left Slide Count : ' + leftSlideCount + ' --&-- Right Slide Count : ' + rightSlideCount + ' --&-- Left Height: ' + leftHeight  + ' --&-- Right Height: ' + rightHeight  );

  var leftInitPos = 'top: 0';

  leftTarget.attr( 'style', leftInitPos );

  var rightInitPos = 'bottom: 0';
  // var rightInitPos = 'top: -' + ( rightHeight - windowHeight );

  rightTarget.attr( 'style', rightInitPos );


  // Incase of resize, recall
  $(window).on( 'resize orientationchange', function(event) {
    console.log(event);

    calcWindowDimensions();

  });

  // init
  calcWindowDimensions();

  $(".slide").swipe( {
    //Generic swipe handler for all directions
    swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
      console.log("You swiped " + direction );

      if ( direction === 'up') {
        changePos( 'up' );
      }

      if ( direction === 'down') {
        changePos( 'down' );
      }
    },
    threshold: 50
  });

  function changePos( increment ) {

    if ( increment === 'up' ) {
      var nextPos = currentPos + 1;
      if (nextPos > (leftSlideCount - 1) ) {
        $("#outro").fadeIn();
        nextPos = (leftSlideCount - 1);
      }
    }

    if ( increment === 'down' ) {
      var nextPos = currentPos - 1;
      if (nextPos < 0) {
        $("#intro").fadeIn();
        nextPos = 0;
      }
    }

    currentPos = nextPos;

    console.log(currentPos);

    var position = currentPos * windowHeight,
        leftPosition = 'top: -' + position + 'px;',
        rightPosition = 'bottom: -' + position + 'px;';

  leftTarget.attr( 'style', leftPosition );

  rightTarget.attr( 'style', rightPosition );

  }

  var ua = navigator.userAgent;
  var event = (ua.match(/iPad/i)) ? 'touchstart' : 'click';

  $('.slide').bind(event, function() {

    $(this).toggleClass('active');
  });

  // INTRO
  $("#intro").swipe( {
    //Generic swipe handler for all directions
    swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
      console.log("You swiped " + direction );

      if ( direction === 'up') {
        $(this).fadeOut();
      }
    },
    threshold: 50
  });

  $('body').bind('mousewheel', function(e){
    if(e.originalEvent.wheelDelta /1200 > 0) {
      changePos( 'up' );
    }
    else{
      changePos( 'down' );
    }
  });


});
