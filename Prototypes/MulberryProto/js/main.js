$( document ).ready(function() {

  var upTarget = $('#up'),
      downTarget = $('#down'),
      upTargetSlide = $('#up .slide'),
      downTargetSlide = $('#down .slide'),
      slideCount = (downTargetSlide.length - 1),
      upSlideCount = upTargetSlide.length,
      downSlideCount = downTargetSlide.length,
      windowHeight = $(window).height(),
      upHeight = upSlideCount * windowHeight,
      downHeight = downSlideCount * windowHeight,
      currentPos = 0,
      playButton = $('#overlay .play'),
      resultFinal = $('#overlay .result'),
      resultFinalSpan = $('#overlay .result span'),
      myPlayer = null,
      windowWidth = null,
      windowHeight = null,
      halfWindowWidth = null,
      shareOverlay = $('#share-overlay'),
      shareOverlayClose = $('#share-overlay .close'),
      shareOverlayOpen = $('#share-button'),
      data = JSON.parse($('#data').text()),
      shopLink = $('.final .shop a');

  // ************************************************************************************
  // ************************** SIZING AND DIMENSIONS ***********************************
  // ************************************************************************************

  // Get width and height of the viewport
  function calcWindowDimensions() {

    windowWidth = $(window).width();
      windowHeight = $(window).height();
      halfWindowWidth = windowWidth / 2;

    console.log( 'Height: ' + windowHeight + 'px --&-- Width: ' + windowWidth + 'px');

    setDimensions( halfWindowWidth, windowHeight );

  };

  // Set the height and width of the divs
  function setDimensions( halfWindowWidth, windowHeight ) {

    var dimensions = 'width: ' + halfWindowWidth + 'px; height: ' + windowHeight + 'px;';

    $('.slide').each(function() {

      $(this).attr( 'style', dimensions );

    });

    goToPos( currentPos );

  };

  console.log( 'Left Slide Count : ' + upSlideCount + ' --&-- Right Slide Count : ' + downSlideCount + ' --&-- Left Height: ' + upHeight  + ' --&-- Right Height: ' + downHeight  );

  goToPos( currentPos );

  // init
  calcWindowDimensions();

  // ************************************************************************************
  // ************************** CONTROLS AND MOVEMENT ***********************************
  // ************************************************************************************

  // delay and relaout after resize.
  var timer;
  $(window).on('resize orientationchange', function() {
    clearTimeout(timer);
    timer = setTimeout(function(){
      calcWindowDimensions();
    }, 1000);
  });

  // touch swiping
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

  // desktop scrolling
  var scrollTimer, lastScrollFireTime = 0;

    $('body').bind('mousewheel', function(e){

      var minScrollTime = 800;
      var now = new Date().getTime();

      function processScroll(e) {
        if(e.originalEvent.wheelDelta /1200 > 0) {
          changePos( 'down' );
        }
        else{
          if ( $('.l'+currentPos).hasClass('active') || $('.r'+currentPos).hasClass('active')) {
            changePos( 'up' );
          }
          if ( currentPos == 0 ) {
            changePos( 'up' );
          }
        }
      }

      if (!scrollTimer) {
          if (now - lastScrollFireTime > (3 * minScrollTime)) {
              processScroll(e);   // fire immediately on first scroll
              lastScrollFireTime = now;
          }
          scrollTimer = setTimeout(function() {
              scrollTimer = null;
              lastScrollFireTime = new Date().getTime();
              processScroll(e);
          }, minScrollTime);
      }
  });

  // Changing slide position
  function changePos( increment ) {

    $('#overlay .selector').fadeOut(250);

    if ( increment === 'up' ) {
      var nextPos = currentPos + 1;
      if (nextPos > (upSlideCount - 1) ) {
        nextPos = (upSlideCount - 1);
      }
    }

    if ( increment === 'down' ) {
      var nextPos = currentPos - 1;
      if (nextPos < 0) {
        nextPos = 0;
      }
    }

    currentPos = nextPos;

    goToPos(currentPos);

    layOutOverlay(currentPos);

    underlineAnswer( currentPos )
  }

  // Changing slide
  function goToPos( pos ) {

  console.log('SINEP' , windowHeight );

    var position = pos * windowHeight,
        upPosition = 'top: -' + position + 'px;',
        downPosition = 'bottom: -' + position + 'px;';

    upTarget.attr( 'style', upPosition );

    downTarget.attr( 'style', downPosition );

    console.log('SINEP');
  }

  // Selecting an answer
  $('.choose').swipe( {
    tap:function(event, target) {

      var sibling = $(this).data('sibling');

      if ( $(sibling).hasClass('active') ) {

        $(sibling).removeClass('active');
        $(this).addClass('active');

        $(sibling).addClass('active-o');
        $(this).removeClass('active-o');

      }

      //else if ( $(this).hasClass('active') ) {
      //
      //   $(this).removeClass('active');
      //   $(sibling).removeClass('active-o');
      // }

      else {

        $(this).addClass('active');
        $(sibling).addClass('active-o');
      }

      $('#overlay .swipe-start p').html('Swipe for next Question');
      $('#overlay .swipe-start').fadeIn(250);

      underlineAnswer( currentPos );
    }
  });

  // play button
  playButton.swipe( {
    tap:function(event, target) {
      console.log('play clicked.');
      $('#video-overlay').fadeIn();
      myPlayer.play();
    }
  });

  // close Video button
  $('#video-overlay .close').swipe( {
    tap:function(event, target) {
      console.log('close clicked.');
      $('#video-overlay').fadeOut();
      myPlayer.pause();
      playButton.fadeIn();
    }
  });

  // open share
  shareOverlayOpen.swipe( {
    tap:function(event, target) {
      console.log('share open clicked.');
      shareOverlay.fadeIn();
    }
  });

  // open share
  shareOverlayOpen.on( 'click', function() {
      console.log('share open clicked.');
      shareOverlay.fadeIn();
  });

  // close share
  shareOverlayClose.swipe( {
    tap:function(event, target) {
      console.log('share closed clicked.');
      shareOverlay.fadeOut();
    }
  });

  // ************************************************************************************
  // ********************************** S I N E P ***************************************
  // ************************************************************************************

  function underlineAnswer( currentPos ) {
    $('.left, .right', '.selector').removeClass('active');

    console.log(currentPos, $('.slide', '.left').length, $('.slide', '.left').eq(currentPos).attr('class'));

    if($('.slide', '.left').eq(currentPos).hasClass('active')) {
      $('.left', '.selector').addClass('active');
    }

    if($('.choose', '.right').eq(-currentPos).hasClass('active')) {
      $('.right', '.selector').addClass('active');
    }
  }

  function layOutOverlay( currentPos ) {

    var selector = $('#overlay .selector'),
        selectorLeft = $('#overlay .selector .left'),
        selectorRight = $('#overlay .selector .right'),
        swipe = $('#overlay .swipe-start');

    if ( currentPos === 0 ) {
      $('#overlay .swipe-start p').html('');
      swipe.fadeIn(250);
      selector.fadeOut(250);
    }

    if ( currentPos === 1 ) {
      swipe.fadeOut(250);

      selectorLeft.text( $('.l1').attr('title') );
      selectorRight.text( $('.r1').attr('title') );
      selector.fadeIn(250);
    }

    if ( currentPos === 2 ) {
      swipe.fadeOut(250);

      selectorLeft.text( $('.l2').attr('title') );
      selectorRight.text( $('.r2').attr('title') );
      selector.fadeIn(250);
    }

    if ( currentPos === 3 ) {
      swipe.fadeOut(250);

      selectorLeft.text( $('.l3').attr('title') );
      selectorRight.text( $('.r3').attr('title') );
      selector.fadeIn(250);
    }

    if ( currentPos === 4 ) {
      swipe.fadeOut(250);

      selectorLeft.text( $('.l4').attr('title') );
      selectorRight.text( $('.r4').attr('title') );
      selector.fadeIn(250);
    }

    if ( currentPos === 5 ) {
      swipe.fadeOut(250);

      selectorLeft.text($('.l5').attr('title'));
      selectorRight.text($('.r5').attr('title'));
      selector.fadeIn(250);
      playButton.fadeOut();
      resultFinal.fadeOut();
    }

    if ( currentPos === 6 ) {
      swipe.fadeOut(250);
      getAnswer();
      playButton.fadeIn();
    }

  }

// ************************************************************************************
// ****************************** ANSWER MANAGEMENT ***********************************
// ************************************************************************************

  // make answer string to compare too
  function getAnswer() {

    var answerString = '';

    $('#up .choose').each(function( index ) {

      if ( $(this).hasClass('active') ) {
        answerString += 'A';
      }
      else {
        answerString += 'B';
      }
    });

    console.log( answerString );


    outputResult( answerString );

  }

  function outputResult( answerString ) {



    $(data.results).each(function( index , element ) {
          
      if( element.combination === answerString ) { 

        console.log('Match: ', element.combination);

        answerObject = element;
      }
    })


    var leftStyle = 'background-image: url("' + answerObject.imageLeftURL + '");',
        rightStyle = 'background-image: url("' + answerObject.imageRightURL +'");';

    // set background image on final slide
    $('#up .final').attr( 'style', $('#up .final').attr('style') + leftStyle );
    $('#down .final').attr( 'style', $('#up .final').attr('style') + rightStyle );

    // set the shop link
    shopLink.attr( 'href', answerObject.shopURL );

    // populate result field and fade it in.
    resultFinalSpan.html( answerObject.summary );
    resultFinal.fadeIn();

    // init videojs
    myPlayer = videojs('home_video');

    // setting correct poster
    myPlayer.poster( answerObject.fullImageURL );

    myPlayer.src([
      { type: 'video/mp4', src: answerObject.videoURL + '.mp4' },
      { type: 'video/webm', src: answerObject.videoURL + '.webm' }
    ]);

    myPlayer.on('ended', function() {
      $('#video-overlay').fadeOut();
      playButton.fadeIn();
    });

  }

});
