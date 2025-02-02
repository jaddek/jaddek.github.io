(function ($) {
    "use strict";

    function animateLayout() {
        let windowWidth = $(window).width(),
            animatedContainer = '',
            animateType = $('#page_container').attr('data-animation')

        if (windowWidth > 991) {
            animatedContainer = $(".page-container");
        } else {
            animatedContainer = $(".site-main");
        }

        animatedContainer.addClass("animated " + animateType);
        $('.page-scroll').addClass('add-prespective');
        animatedContainer.addClass('transform3d');
        setTimeout(function () {
            $('.page-scroll').removeClass('add-prespective');
            animatedContainer.removeClass('transform3d');
        }, 1000);
    }

    function scrollTop() {
        if ($('body').scrollTop() > 150) {
            $('.scroll-to-top').removeClass('hidden-btn');
        } else {
            $('.scroll-to-top').addClass('hidden-btn');
        }
    }

    function skillsStyles() {
        let custom_styles = "";
        $('.skill-container').each(function () {
            let value = $(this).attr('data-value');

            if (value >= 101) {
                value = '100';
            }

            if (typeof value != 'undefined') {
                let id = $(this).attr('id'),
                    $custom_style = '#' + id + ' .skill-percentage { width: ' + value + '%; } ';
                custom_styles += $custom_style;
            }
        });
        $('head').append('<style data-styles="leven-theme-skills-css" type="text/css">' + custom_styles + '</style>');
    }

    $(window)
        .on('load', function () {
            $(".preloader").fadeOut(800, "linear");
            animateLayout();
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
                newvalueX = width * pageX * -1,
                newvalueY = height * pageY * -1;
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
        skillsStyles();
    });

    // Mobile menu
    $('.menu-toggle').on("click", function () {
        $('.site-nav').addClass('animate');
        $('.site-nav').toggleClass('mobile-menu-hide');
    });

})(jQuery);