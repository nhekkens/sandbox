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

					$('nav').toggleClass('active');
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



});
