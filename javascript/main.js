$(document).ready(function(){
  var showMacbook = function(macbook) {
    $('.macbook img').removeClass('active');
    $('.macbook img[data-macbook="' + macbook + '"]').addClass('active');
    $('.view-switcher button').removeClass('active');
    $('.view-switcher button[data-macbook="' + macbook + '"]').addClass('active');
  };

  var Slideshow = function(className) {
    var $el = $(className);
    var images = $el.find('.image');
    var track = $el.find('.track');
    var nextButton = $el.find('.next');
    var prevButton = $el.find('.prev');
    var label = $(className + '-label');
    var currentIndex = 0;

    var moveTo = function(index) {
      var position = (index * 100 * -1);

      track.animate({marginLeft: position + "%"}, 300, function(){
        var currentImage = images.eq(index);
        label.text(currentImage.find('img').attr('alt'));
        currentIndex = index;
      });
    };

    var moveToNext = function() {
      if (currentIndex + 1 !== images.length) {
        moveTo(currentIndex + 1);
      } else {
        moveTo(0);
      }
    };

    var moveToPrev = function() {
      if (currentIndex - 1 !== -1) {
        moveTo(currentIndex - 1);
      } else {
        moveTo(images.length - 1);
      }
    };


    nextButton.on('click', function(event){
      event.preventDefault();
      moveToNext();
    });

    prevButton.on('click', function(event){
      event.preventDefault();
      moveToPrev();
    });

    images.on('swipeleft', function(event){
      moveToNext();
    });

    images.on('swiperight', function(event){
      moveToPrev();
    });

    images.on('movestart', function(e) {
      if ((e.distX > e.distY && e.distX < -e.distY) ||
          (e.distX < e.distY && e.distX > -e.distY)) {
        e.preventDefault();
      }
    });



    var setup = function() {
      moveTo(currentIndex);
    };

    setup();
  };

  var slideshow = new Slideshow('.slideshow');

  $('.mobile-menu').click(function(event){
    event.preventDefault();
    $('.navigation-list').toggleClass('show-mobile-nav');
  });


  $('.view-switcher button').click(function(event) {
    event.preventDefault();
    var macbook = $(this).data('macbook');
    showMacbook(macbook);
  });

  $('.macbook-toggle').click(function(event) {
    event.preventDefault();
    var macbook = $(this).find('img:not(.active)').data('macbook');
    showMacbook(macbook);
  });

  $('form.sale-item').on('submit', function(event) {
    event.preventDefault();
    var $form = $(this);
    var $status = $form.find('.form-status');
    var data = {
      json: true
    };

    if ($form.find('.order-email').length > 0) {
      data.order = {
        email: $form.find('.order-email').val()
      };
    } else {
      data.product = {
        reg_code: $form.find('.reg-code').val()
      };
    }

    $status.text('Processing...');

    $.ajax({
      type: 'POST',
      url: $form.attr('action'),
      data: data,
      dataType: 'json'
    }).done(function(data) {
      if (data.notice) {
        $status.html(data.notice);
      } else if (data.success) {
        $status.html(data.success);
      } else if (data.url) {
        window.location = data.url;
      }
    });
  });


});
