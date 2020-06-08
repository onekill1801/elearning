$(function () {
    $(".icon-search-post").click(function () {
        $(this).toggleClass("active");
        $(".search-form .form-input").toggle("500");
    });
    $('#searchform').submit(function () {
        // Get the Login Name value and trim it
        var key = $.trim($('#s').val());
        // Check if empty of not
        if (key === '') {
            alert('Nhập vào nội dung tìm kiếm!');
            return false;
        }
    });
});

var swiper = new Swiper('.slider-blog .swiper-container', {
    slidesPerView: 1,
    spaceBetween: 15,
    loop: true,
    breakpoints: {
        640: {
            slidesPerView: 1.2
        }
    },
    autoplay: {
        delay: 250000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.slider-blog .swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.slider-blog .swiper-button-next',
        prevEl: '.slider-blog .swiper-button-prev',
    },
    
});

var swiper = new Swiper('.interested-post .swiper-container', {
    preventClicks: true,

    pagination: {
        el: '.interested-post .swiper-pagination',
        clickable: true,
    },

    paginationClickable: true,
    loop: false,
    slidesPerView: 2.3,
    navigation: {
        nextEl: '.interested-post .swiper-button-next',
        prevEl: '.interested-post .swiper-button-prev',
    },
    spaceBetween: 30,
    breakpoints: {
        1024: {
            slidesPerView: 2.3
        },
        768: {
            slidesPerView: 2.3
        },
        640: {
            slidesPerView: 1.6
        },
        425: {
            slidesPerView: 1.2,
            spaceBetween: 15
        }
    }
});

var swiper = new Swiper('.related-post .swiper-container', {
    preventClicks: true,

    pagination: {
        el: '.related-post .swiper-pagination',
        clickable: true,
    },

    paginationClickable: true,
    loop: false,
    slidesPerView: 4,
    navigation: {
        nextEl: '.interested-post .swiper-button-next',
        prevEl: '.interested-post .swiper-button-prev',
    },
    spaceBetween: 30,
    breakpoints: {
        1024: {
            slidesPerView: 2.3
        },
        768: {
            slidesPerView: 2.3
        },
        640: {
            slidesPerView: 1.6
        },
        425: {
            slidesPerView: 1.2,
            spaceBetween: 15
        }
    }
});

var topicSwiper = new Swiper('.topic-hot .swiper-container', {
    preventClicks: true,
    pagination: {
        el: '.topic-hot .swiper-pagination',
        clickable: true,
    },
    paginationClickable: true,
    loop: false,
    slidesPerView: 2.8,
    navigation: {
        nextEl: '.topic-hot .swiper-button-next',
        prevEl: '.topic-hot .swiper-button-prev',
    },
    spaceBetween: 30,
    breakpoints: {
        1200: {
            slidesPerView: 2.8
        },
        1024: {
            slidesPerView: 3.15
        },
        768: {
            slidesPerView: 2.4
        },
        640: {
            slidesPerView: 1.6
        },
        425: {
            slidesPerView: 1.6,
            spaceBetween: 15
        }
    }
});