var targetID = '';

// Get width and height of the viewport
function calcWindowDimensions() {

	var windowWidth = $(window).width(),
	windowHeight = $(window).height();
	console.log( 'Height: ' + windowHeight + 'px --&-- Width: ' + windowWidth + 'px');

	setDimensions( windowWidth, windowHeight );
};

// Set the height and width of the divs
function setDimensions( windowWidth, windowHeight ) {

	var dimensions = 'width: ' + windowWidth + 'px; height: ' + windowHeight + 'px;',
		$target = $('.img-container');

	$target.each(function() {

		// var bgImage = $(this).attr(,
			// stylz = bgImage + dimensions;
		$(this).attr( 'style', dimensions );

	});	
};

// Incase of resize, recall
$(window).resize(function() {
	calcWindowDimensions();
	getPos();
});

// when user stops scrolling this calls getPos and get the target then scroll to it.
var timer,
	activationEvent = null;

// set the deligated event
if (Modernizr.touch) {
	
	activationEvent = 'touchmove';
} else {

	activationEvent = 'scroll';
}

console.log('activationEvent: ' + activationEvent );

$(window).on( activationEvent,function () {
    clearTimeout(timer);
    timer = setTimeout( getPos , 500 );
});

var getPos = function ( flip ) { 

    console.log('Stopped Scrolling & Distance from top is: ' + window.pageYOffset );
    var tempH = 0;

	$('.img-container').each(function() {

		tempH += $(this).height();
		console.log('tempH: ' + tempH );

		if ( tempH >= ( window.pageYOffset + ( $(window).height() / 2 ) ) ) {
			console.log('You Stopped in ' + $(this).attr( 'id' ) );
			targetID = '#' + $(this).attr( 'id' );
			// scroll2( $(this).attr( 'id' ) );
			$('html,body').animate({ scrollTop: $(targetID).offset().top}, 400);

			return false;
		}
	});	
};