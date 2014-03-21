$( document ).ready(function() {
	//sidebar
	$('.launch').on('click', function (){
		$('.sidebar').sidebar('toggle');
	});
	$('.sidebar .hide').on('click', function (){
		$('.sidebar').sidebar('hide');
	});
	/*$("#leftButton").on("hover", fuction(){
		$(".text").show().fadein(500);
	});
	$("#leftButton").on("mouseout", fuction(){
		$(".text").hide().fadeOut(500);
	});*/
});