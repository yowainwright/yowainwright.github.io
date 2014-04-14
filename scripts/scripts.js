$( document ).ready(function() {
	//sidebar
	$('.launch').on('click', function (){
		$('.sidebar').sidebar('toggle');
	});
	$('.sidebar .hide').on('click', function (){
		$('.sidebar').sidebar('hide');
	});
	//footer social share
	$(".showSocial").on("click", function(){
		$("#showSocial").toggleClass('blackBg');
		$(".socialWrap").slideToggle("fast");
	});
	$("#footerWrap").on('mouseleave', function () {
		$("#showSocial").removeClass('blackBg');
		$(".socialWrap").css('display','none');
	});
	//current year
	var currentYear = (new Date).getFullYear();
  	$("#year").text( (new Date).getFullYear());
  	//popupß
  	$('.popup').popup();
  	//don't annoy me popup!
  	$('.no-more').on('click', function() {
  		$(this).popup('destroy');
  	});
  	// glide slide
  	$('.slider').glide({
  		autoplay:false,
  		arrowsWrapperClass: 'slider-arrows',
  		arrowRightText:'',
  		arrowLeftText:''
  	});
  	// waypoints
  	// make it sticky
  	$('.peek').waypoint('sticky', {
  		offset: 210 //ofsets the height of the header
  	});
  	$('section').waypoint(function(direction) {
        $('a[href="#' + this.id + '"]').toggleClass('active', direction === 'down');
        }, {
            offset: '10%'
        }).waypoint(function(direction) {
       		$('a[href="#' + this.id + '"]').toggleClass('active', direction === 'up');
        }, {
            offset: function() {
            return -$(this).height();
         }
    });
    if ($('#about').hasClass('main')) {$('body').addClass('about');}
    if ($('#resume').hasClass('main')) {$('body').addClass('resume');}
    if ($('#home').hasClass('main')) {$('body').addClass('home');}

    $('.home .masthead').remove();
});