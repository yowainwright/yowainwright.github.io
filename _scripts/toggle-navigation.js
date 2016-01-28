(function(window, document) {
	// selectors to toggle nav
	var navToggle = document.getElementById('nav-toggle'),
		navClose = document.getElementById('nav-close'),
		navToggleElments = [ navToggle, navClose ],
		body = document.body;

	// toggle nav visibility function
	var toggleNav = function() {
		body.classList.toggle('is-displaying-nav');
	};

	for ( var i = 0 ; i < navToggleElments.length; i++ ) {
		navToggleElments[i].addEventListener('click', toggleNav, false);
	}

})(this, this.document);