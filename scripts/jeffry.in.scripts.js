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

  //slider
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
  
  //scroll
  function waypointsRun() {
    $('.peek').waypoint('sticky');
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
    $(window).scroll(function() {    
      var scroll = $(window).scrollTop();
      if (scroll <= 410) {
        $('a[href="#section1"]').addClass("active");
        $('.peek').removeClass('stuck');
      } 
    });
  }
  if ($(window).width() < 768) {
  $('.item').removeClass('peek');
  } 
  if ($('div').hasClass('peek')) {
    waypointsRun();
  }
   
  //lets load some stuff
  /*$( window ).scroll(function() {
    $('#leftButton').fadeOut('slow');
  });
  $.fn.scrollStopped = function(callback) {           
        $(this).scroll(function(){
            var self = this, $this = $(self);
            if ($this.data('scrollTimeout')) {
              clearTimeout($this.data('scrollTimeout'));
            }
            $this.data('scrollTimeout', setTimeout(callback,250,self));
        });
    };
$(window).scrollStopped(function(){
    $('#leftButton').fadeIn('fast');
});*/

});