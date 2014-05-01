$( document ).ready(function() {
  
  //sidebar
  $('.mobile.only.launch').on('click', function (){
    $('.sidebar').sidebar({
      overlay:true
    }).sidebar('toggle');
  });
  $('.computer.only.launch').on('click', function (){
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

  //popup
  $('.popup').popup();

  //message 
  $('.close').on('click', function () {
    $(this).parent('.message').hide();
  });

  function sliderRun() {
    $('.slider').glide({
      autoplay:false,
      arrowsWrapperClass: 'slider-arrows',
      arrowRightText:'',
      arrowLeftText:''
    });
  }
  if ($('div').hasClass('slider')) {
    sliderRun();
  }
  
  function waypointsRun() {
    //todo fix sticky on scroll back to top
    $('.peek').waypoint('sticky', {
    offset: 300 //ofsets the height of the header
    });
    //todo fix pointing after scroll back to top
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
    if( $(window).scrollTop() < 200 ) {
      alert('heyo');
    }
  }
  //mobile issue in android fix ?
  if ($(window).width() < 768) {
  $('.item').removeClass('peek');
} 
  if ($('div').hasClass('peek')) {
    waypointsRun();
  }
});