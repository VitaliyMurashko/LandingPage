var lpApp = angular.module('lpApp',[]);

lpApp.controller('lpPriceCtrl',function($scope,$http){
    
    $scope.sortBy='name';
    $scope.sortRev=false;
    
    $http.get('price.json').then(function(res){
        $scope.prices=res.data;
        console.log($scope.prices);
        calc(); 
    }).catch(function(err){
        $scope.requestStatus=err.status;
        $scope.requestStatusText=err.statusText;
    });
    
    $scope.sortSet= function(propertyName){
        console.log($scope.sortBy);
        console.log(propertyName);
       if($scope.sortBy==propertyName){
        $scope.sortRev=!$scope.sortRev;
           console.log($scope.sortRev);
        }
        $scope.sortBy=propertyName;
    };
    
    function calc(){
      $scope.prices.forEach(function(price){
          price.price2=price.price*(1-price.discount);
      });  
    };
    
});



(function ($) {
    $(document).ready(function () {
        //        Изменения хедера

        function lpHeader() {
            if ($(window).scrollTop() == 0) {
                $('header').addClass('top');
            } else {
                $('header.top').removeClass('top');
            }
        }
        lpHeader();
        $(window).on('load scroll', lpHeader);

        //        Плавный скролл

        var lpNav = $('header ul');
        lpNav.find('li a').on('click', function (e) {

            var linkTrgt = $($(this).attr('href'));
            if (linkTrgt.length > 0) {

                e.preventDefault();

                var offset = linkTrgt.offset().top;
                var a = linkTrgt.attr('data-offset');
                $('html,body').animate({
                    scrollTop: offset - a //(- 44 поправка на высоту навигации)
                }, 750);
            }

        });

        //        Активный экран
        function lpSetNavActive() {
            var curItem = '';
            $('section').each(function () {
                if ($(window).scrollTop() > $(this).offset().top - 200) {
                    curItem = $(this).attr('id');
                }
            });

            if (lpNav.find('li.active a').attr('href') != '#' + curItem || lpNav.find('li.active ').length == 0) {
                lpNav.find('li.active').removeClass('active');

                lpNav.find('li a[href="#' + curItem + '"]').parent().addClass('active');
            }
        }
        lpSetNavActive();
        $(window).on('load scroll', lpSetNavActive);

        /*Слайдер*/


        $(".lp-slider1").owlCarousel({
            items: 1,
            nav: true,
            navText: ['<i class="fas fa-arrow-left"></i>', '<i class="fas fa-arrow-right"></i>'],

            //attachable-только прослушиваем событие
            //triggerable-изменяем событие                             

        });
        //меняем стр при переключения слайдера
        $('.lp-slider1').on('changed.owl.carousel', function (e) {
            $('#services h2').text('включился слайд номер' + (e.item.index + 1));
        });

        //действия на стр заставляют слайдер переключится
        $('#services h2').click(function () {
            $('.lp-slider1').trigger('to.owl.carousel', 1);
        });

        $(".lp-slider2").owlCarousel({
            items: 1,
            nav: true,
            navText: ['<i class="fas fa-arrow-left"></i>', '<i class="fas fa-arrow-right"></i>'],
            responsive: {
                200: {
                    items: 1,
                    nav: true
                },
                600: {
                    items: 3,
                    nav: false
                },
                950: {
                    items: 5,
                    nav: true,
                    loop: false
                }
            }



        });
        //Табулятор
        $('.lp-tabs').each(function () {

            var tabs = $(this),
                tabsTitleNames = [];
            tabs.find('div[data-tab-title]').each(function () {
                tabsTitleNames.push($(this).attr('data-tab-title'));
            }).addClass('lp-tab');

            tabs.wrapInner('<div class="lp-tabs-content"></div>');
            tabs.prepend('<div class="lp-tabs-titles"><ul></ul></div>');

            var tabsTitles = tabs.find('.lp-tabs-titles'),
                tabsContent = tabs.find('.lp-tabs-content'),
                tabsContentTabs = tabsContent.find('.lp-tab');
            tabsTitleNames.forEach(function (value) {
                tabsTitles.find('ul').append('<li>' + value + '</li>');
            });

            var tabsTitlesItems = tabsTitles.find('ul li');
            tabsTitlesItems.eq(0).addClass('active');
            tabsContentTabs.eq(0).addClass('active').show();
            tabsContent.height(tabsContent.find('.active').outerHeight());
            tabsTitlesItems.on('click', function () {
                if (!tabs.hasClass('changing')) {
                    tabs.addClass('changing');
                    tabsTitlesItems.removeClass('active');
                    $(this).addClass('active');
                    var curTab = tabsContent.find('.active'),
                        nextTab = tabsContentTabs.eq($(this).index());
                    var curHeight = curTab.outerHeight();
                    nextTab.show();
                    var nextHeight = nextTab.outerHeight();
                    nextTab.hide();

                    if (curHeight < nextHeight) {
                        tabsContent.animate({
                            height: nextHeight
                        }, 500);
                    }
                    curTab.fadeOut(500, function () {

                        if (curHeight > nextHeight) {
                            tabsContent.animate({
                                height: nextHeight
                            }, 500);
                        }
                        nextTab.fadeIn(500, function () {

                            curTab.removeClass('active');
                            nextTab.addClass('active');
                            tabs.removeClass('changing');


                        });
                    });
                }


            });
            $(window).on('load resize', function () {
                tabsContent.height(tabsContent.find('.active').outerHeight());
            });

        });
        /* Всплывающее окно*/
        $('.lp-mfp-inline').magnificPopup({
            type: 'inline'
        });
        $('.lp-mfp-iframe').magnificPopup({
            type: 'iframe'
        });
        $('.lp-gallery').each(function () {
            $(this).magnificPopup({
                delegate: 'a',
                type: 'image',
                gallery: {
                    enabled: true
                }
            });
        });

        //Задание 2   
        $('#page1').magnificPopup({
            type: 'ajax'

        });

        //Задание 3
        $('#btnGall').magnificPopup({
            items: [
                {
                    src: 'img/slideshow/slide2.jpg',
                    type: 'image'
      },
                {
                    src: 'https://www.youtube.com/watch?v=Nmby6MiXZks',
                    type: 'iframe'
      },
                {
                    src: '/page1.html',
                    type: 'ajax'
      },
    ],
            gallery: {
                enabled: true
            }

        });
        /*Обратная связь */
        $('#lp-fb1').wiFeedBack({
            fbScript: 'blocks/wi-feedback.php',
            fbLink: '.lp-fb1-link',
            fbColor: '#7952b3'
        });
        $('#lp-fb2').wiFeedBack({
            fbScript: 'blocks/wi-feedback.php',
            fbLink: false,
            fbColor: '#7952b3'
        });
        $('#lp-fb3').wiFeedBack({
                fbScript: 'blocks/wi-feedback.php',
                fbLink: '.lp-fb4-link',
                fbColor: 'green'
            });
    });
})(jQuery);
