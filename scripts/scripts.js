$( document ).ready(function() {
	//sidebar
	$('.launch').on('click', function (){
		$('.sidebar').sidebar('toggle');
	});
	$('.sidebar .hide').on('click', function (){
		$('.sidebar').sidebar('hide');
	});
	$("#leftButton").on("mouseenter", function() {
		$(".text").show(500);
	});
	$("#leftButton").on("mouseleave", function() {
		$(".text").hide(500);
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
  	//popup

  	$('.popup').popup();
  	$('.noMore').on('click', function() {
  		$(this).popup('destroy');
  	});
  	
  	//specify
  	$('.slider').glide();

});