$(document).ready(function(){
    $('.carousel__inner').slick({
        infinite: true,
        speed: 1200,
        prevArrow: '<button type="button" class="slick-prev"><img src="../icons/prev_button.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="../icons/next_button.png"></button>',
      });

      $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });

      function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
          })
      };

      toggleSlide('.catalog-item__link');
      toggleSlide('.catalog-item__back');

      // модальные окна
      $('[data-modal=consultation').on('click', function() {
        $('.overlay').css('display', 'flex').hide().fadeIn();
        $('#consultation').fadeIn();
      });
      
      $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #order, #thanks').fadeOut();
      });
      
      $(document).keydown(function(e) {
        if (e.keyCode === 27) {
          e.stopPropagation;
          $('.overlay, #consultation, #order, #thanks').fadeOut();
        }
      });

      $('.buy-button').each(function(i) {
        $(this).on('click', function() {
          $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
          $('.overlay, #order').fadeIn();
        });
      });

      function validateForms(form) {
        $(form).validate({
          rules: {
            name: 'required',
            phone: 'required',
            email: {
              required: true,
              email: true
            }
          },
          messages: {
            name: 'Пожалуйста, введите своё имя',
            phone: 'Пожалуйста, введите номер телефона',
            email: {
              required: 'Пожалуйста, введите свою почту',
              email: 'Вы неверно ввели почту'
            }
          }
        });
      }

      validateForms('#consultation-form');
      validateForms('#consultation form');
      validateForms('#order form');
  });