(function ($) {
    "use strict";


    function scrollTop() {
        if ($('body').scrollTop() > 150) {
            $('.scroll-to-top').removeClass('hidden-btn');
        } else {
            $('.scroll-to-top').addClass('hidden-btn');
        }
    }

    $(window)
        .on('load', function () {
            setTimeout(function () {
                $(".preloader").fadeOut(800, "linear");
            }, 300);
        })
        .on('hashchange', function (event) {
            if (location.hash) {
                ajaxLoader();
            }
        });


    // On Document Load
    $(document).ready(function () {
        let elements = null;
        let movementStrength = 15;
        let height = movementStrength / $(document).height();
        let width = movementStrength / $(document).width();
        $("body").on('mousemove', function (e) {
            let pageX = e.pageX - ($(document).width() / 2),
                pageY = e.pageY - ($(document).height() / 2),
                newvalueX = width * pageX * -5,
                newvalueY = height * pageY * -2;
            if ($('.page-container').hasClass('bg-move-effect')) {
                elements = $('.home-photo .hp-inner:not(.without-move), .lm-animated-bg');
            } else {
                elements = $('.home-photo .hp-inner:not(.without-move)');
            }
            elements.addClass('transition');
            elements.css({
                "background-position": "calc( 50% + " + newvalueX + "px ) calc( 50% + " + newvalueY + "px )",
            });

            setTimeout(function () {
                elements.removeClass('transition');
            }, 300);
        })
            .scroll(function () {
                scrollTop();
            });

        $('.scroll-to-top').click(function () {
            $('body,html').animate({
                scrollTop: 0
            }, 400);

            return false;
        });

        scrollTop();
    });

    // Mobile menu
    $('.menu-toggle').on("click", function () {
        $('.site-nav').addClass('animate');
        $('.site-nav').toggleClass('mobile-menu-hide');
    });

})(jQuery);