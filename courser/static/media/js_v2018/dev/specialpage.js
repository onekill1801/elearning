$(document).ready(function() {
    amazonmenu.init({
        menuid: 'mysidebarmenu'
    })
    $(".remove-navibar").click(function() {
        $("#js-bootstrap-offcanvas").trigger("offcanvas.toggle");
    });
    $('.unica-box-course-f').slick({
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 5,
        responsive: [{
            breakpoint: 1025,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                infinite: true
            }
        },
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: "unslick"
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });
    $('.box-teacher').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [{
            breakpoint: 1025,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true
            }
        },
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });
    $(".pop").popover({
        trigger: "hover",
        html: true,
        animation: true,
        delay: { show: 500, hide: 100 },
        content: function() {
            return $('#popover-content').html();
        }
    }).on("mouseenter", function() {
            var _this = this;
            $(this).popover({
                delay: { show: 500, hide: 10000 }
            });
            $(".popover").on("mouseleave", function() {
                $(_this).popover("hide");
            });
        }).on("mouseleave", function() {
        var _this = this;
        setTimeout(function() {
            if (!$(".popover:hover").length) {
                $(_this).popover("hide");
            }
        }, 0);
    });
});