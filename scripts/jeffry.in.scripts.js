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
    offset: 210 //ofsets the height of the header
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
  }
  if ($('div').hasClass('peek')) {
    waypointsRun();
  }
});