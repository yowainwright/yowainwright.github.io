$( document ).ready(function() {
	//sidebar
	$('.launch').on('click', function (){
		$('.sidebar').sidebar('toggle');
	});
	$('.sidebar .hide').on('click', function (){
		$('.sidebar').sidebar('hide');
	});

	
});