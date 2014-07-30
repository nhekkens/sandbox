$(document).ready(function() {
	'use strict';
		// Shows values of input fields
	function printValue( target, resultTarget ) {

		var value = $(target).val();
		$(resultTarget).val( value );
	}

	// setup up carousel
	function setupCarousel( target, targetContainer, nav, panelCount, panelWidth, panelRatio ) {

		// Create and destroy previouse panels.
		// var	panels = '';
		// for ( var i = 0, limit = panelCount; i < limit; i++ ) {    
		//     console.log( "Creating Panel " + i );
		//     panels += '<figure>' + i + '</figure>';
		// }
		// $( target ).html( panels );

		// Caluculate the panelHeight
		var panelHeight = Math.round( panelWidth / panelRatio );

		// Apply container dimensions
		var $container = $(targetContainer),
			containerStyle = 'width: ' + ( parseInt(panelWidth) + 24 ) + 'px; height: ' + ( parseInt(panelHeight) + 24 ) + 'px;';
		$container.attr( 'style', containerStyle );

		// Initialize carousel
		initialiseCarousel( target, nav, panelWidth, panelHeight );

	};

	// init carousel
	function initialiseCarousel( target, nav, panelWidth, panelHeight ) {

		// variables
		var $carousel = $(target),
			$navigation = $(nav),
			prefix = '-webkit-',
			$panelChildren = $carousel.children(),
			panelCount = $panelChildren.length,
			currentAngle = 0,
			panelCurrentAngle = 0,
			angle = 360 / panelCount,
			translateZ = Math.round( ( panelWidth / 2 ) / Math.tan( ( ( Math.PI * 2 ) / panelCount ) / 2 ) );

		// log variables
		console.log('Carousel: ' + target 
			+ ' --- panelCount: ' + panelCount 
			+ ' --- panelWidth: ' + panelWidth 
			+ 'px --- translateZ: ' + translateZ 
			+ ' --- Angle: ' + angle
		);

		// initial carousel style
		var initStyle = prefix + 'transform: translateZ(-' + translateZ + 'px)';
		$carousel.attr( 'style', initStyle );

		// individual panel styles
		$panelChildren.each( function() { 
			var panelStyle = prefix + 'transform: rotateY(' + panelCurrentAngle + 'deg) translateZ(' + translateZ + 
			'px); width: ' + panelWidth + 'px; height: ' + panelHeight + 'px; line-height: ' + panelHeight + 'px;';
			$(this).attr( 'style', panelStyle );
			panelCurrentAngle += angle;
		});

		// toggle slides next/prev
		$navigation.on('click', function( event ) {
			var increment = parseInt( event.target.getAttribute('data-increment') );
			currentAngle += angle * increment * -1;

			var nextStyle = prefix + 'transform: translateZ(-' + translateZ + 'px) rotateY(' + currentAngle + 'deg)';
			console.log(nextStyle);
			$carousel.attr('style', nextStyle);
		});

	};

	$('.range-input').on( 'change', function() {

		var pCount = $('#panel-count').val(),
			pWidth = $('#panel-width').val(),
			pRatio = $('#panel-ratio').val();
		console.log('UPDATE VALUES --- Panel-Count: ' + pCount + ' --- Panel-Width: ' + pWidth + ' --- Panel-Ratio: ' + pRatio );

		setupCarousel('#carousel', 'div.carousel-container', 'button.navigation', pCount, pWidth, pRatio );
	});

	setupCarousel('#carousel', 'div.carousel-container', 'button.navigation', '7', '800', '1.5' );

});

