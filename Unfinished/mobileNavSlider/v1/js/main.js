$(document).ready(function() {
	'use strict';

	// BURGER MENU
	var Menu = {

		el: {
			ham: $('.menu-hekkens'),
			menuTop: $('.menu-hekkens-top'),
			menuMiddle: $('.menu-hekkens-middle'),
			menuBottom: $('.menu-hekkens-bottom')
		},

		init: function() {
			Menu.bindUIactions();
		},

		bindUIactions: function() {
			Menu.el.ham
			.on(
			'click',
				function(event) {
					Menu.activateMenu(event);
					event.preventDefault();

					$('#menu').toggleClass('active');
				}
			);
		},

		activateMenu: function() {
			Menu.el.menuTop.toggleClass('menu-hekkens-top-click');
			Menu.el.menuMiddle.toggleClass('menu-hekkens-middle-click');
			Menu.el.menuBottom.toggleClass('menu-hekkens-bottom-click');
		}
	};

	Menu.init();

	$('#main-slider li').on('click', function() {

		console.log('click Main')

		var target = $(this).html();

		if( $('#sub-' + target).hasClass('active') ){

			$('#sub-' + target).removeClass('active');

		}
		else {

			$('.level-2').removeClass('active');
			$('#sub-' + target).addClass('active');
		}
		// remove class on others

	})

});
