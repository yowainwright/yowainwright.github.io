(function(window, document) {

	// this file is not used 11-4-2015
	var siteHeader = document.getElementById("site-header"),
		navToggle = document.getElementById("nav-toggle"),
		pageContent = document.getElementById("page-content"),
		startShift = 1,
		windowOffset = 0,
		scrollPosition = 0;

	if (siteHeader.length < 1 || navToggle < 1 ) return;

	var toggleNavToggle = function() {
		windowOffset = window.pageYOffset;
		if (windowOffset > scrollPosition &&
			scrollPosition > navToggle.offsetHeight ) {
			siteHeader.classList.add("is-hiding-nav-toggle");
        } else {
            siteHeader.classList.remove("is-hiding-nav-toggle");
        }
        scrollPosition = windowOffset;
	};

	document.addEventListener('DOMContentLoaded', function(){
		window.addEventListener('scroll', _.throttle(toggleNavToggle, 250));
	}, false);

})(this, this.document);