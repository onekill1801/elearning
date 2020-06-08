$('.dg-btn-buy').click(function () {
    $(this).find('.dg-txt-buy').text("Đã chọn");
    //$(this).removeClass("btn-add_cart");
    $(this).addClass("choosed");
});

$('.btn-add_cart').on('click', function () {
    $('.cart_mobile_grow').text(parseInt($('.cart_mobile_grow').text()) + 1);
    if ($('.btn-cart').length > 0) {
        var cart = $('.btn-cart');
        var imgtodrag = $(this);
        if (imgtodrag) {
            var imgclone = imgtodrag.clone()
                .offset({
                    top: imgtodrag.offset().top,
                    left: imgtodrag.offset().left
                })
                .css({
                    'opacity': '0.5',
                    'position': 'absolute',
                    'height': '150px',
                    'width': '150px',
                    'z-index': '100'
                })
                .appendTo($('body'))
                .animate({
                    'top': cart.offset().top + 10,
                    'left': cart.offset().left + 10,
                    'width': 75,
                    'height': 75
                }, 1000, 'easeInOutExpo');

            setTimeout(function () {
                cart.effect("shake", {
                    times: 2
                }, 200);
            }, 1500);

            imgclone.animate({
                'width': 0,
                'height': 0
            }, function () {
                $(this).detach()
            });
        }
        /*setTimeout(function () {
            var count = $('.nbtet').text();
            var number = parseInt(count) + 1;
            if (number % 2 === 1) {
                toastr.success("Bạn được tặng thêm 1 khóa học miễn phí.");
            }
        }, 300);*/
    }
});

var paging = 0;
$('.btn-load-more').click(function () {
    var params = hashParam();
    paging = paging + 1;
    $.ajax({
        url: '/parity/loadmore',
        type: 'POST',
        data: {page: paging, params},
        success: function (result) {
            if (result.success) {
                $('.box-loadmore').append(result.data.html);
                if (result.data.count < 30) {
                    $('.btn-load-more').remove();
                }
                $('body').on('click', '.btn-add_cart', function () {
                    var course_id = $(this).attr('data-id');
                    var c_id = $(this).attr('data-cid');
                    $.ajax({
                        type: 'POST',
                        url: '/course_action/add_to_cart',
                        data: {
                            'Course_id': course_id
                        },
                        beforeSend: function () {
                            // setting a timeout
                            //+c_id
                            $('.cid_' + c_id).html('<img src="/icon/loader.gif"/> Đang xử lý');
                        },
                        success: function (data) {
                            $('.cid_' + c_id).html('<img src="/icon/success.png" width="15px"/> Đã thêm vào giỏ ');
                            $('.badge').html(data);
                            $('.number-course').html(data);
                            $('.nbtet').html(data);
                            $('.cart_show').show();
                        }
                    });
                });

                $('body').on('click', '.dg-btn-buy', function () {
                    $(this).find('.dg-txt-buy').text("Đã chọn");
                    //$(this).removeClass("btn-add_cart");
                    $(this).addClass("choosed");
                });

                $('.btn-add_cart').on('click', function () {
                    if ($('.btn-cart').length > 0) {
                        var cart = $('.btn-cart');
                        var imgtodrag = $(this);
                        if (imgtodrag) {
                            var imgclone = imgtodrag.clone()
                                .offset({
                                    top: imgtodrag.offset().top,
                                    left: imgtodrag.offset().left
                                })
                                .css({
                                    'opacity': '0.5',
                                    'position': 'absolute',
                                    'height': '150px',
                                    'width': '150px',
                                    'z-index': '100'
                                })
                                .appendTo($('body'))
                                .animate({
                                    'top': cart.offset().top + 10,
                                    'left': cart.offset().left + 10,
                                    'width': 75,
                                    'height': 75
                                }, 1000, 'easeInOutExpo');

                            setTimeout(function () {
                                cart.effect("shake", {
                                    times: 2
                                }, 200);
                            }, 1500);

                            imgclone.animate({
                                'width': 0,
                                'height': 0
                            }, function () {
                                $(this).detach()
                            });
                        }
                        setTimeout(function () {
                            var count = $('.nbtet').text();
                            var number = parseInt(count) + 1;
                            if (number % 2 === 1) {
                                toastr.success("Bạn được tặng thêm 1 khóa học miễn phí.");
                            }
                        }, 300);
                    }
                });
            } else {
                $('.btn-load-more').remove();
            }
        }
    });
});

$('.btn-load-more-new').click(function () {
    var params = hashParam();
    paging = paging + 1;
    $.ajax({
        url: '/create/loadmore',
        type: 'POST',
        data: {page: paging, params},
        success: function (result) {
            if (result.success) {
                $('.box-loadmore').append(result.data.html);
                if (result.data.count < 30) {
                    $('.btn-load-more').remove();
                }
                $('body').on('click', '.btn-add_cart', function () {
                    var course_id = $(this).attr('data-id');
                    var c_id = $(this).attr('data-cid');
                    $.ajax({
                        type: 'POST',
                        url: '/course_action/add_to_cart',
                        data: {
                            'Course_id': course_id
                        },
                        beforeSend: function () {
                            // setting a timeout
                            //+c_id
                            $('.cid_' + c_id).html('<img src="/icon/loader.gif"/> Đang xử lý');
                        },
                        success: function (data) {
                            $('.cid_' + c_id).html('<img src="/icon/success.png" width="15px"/> Đã thêm vào giỏ ');
                            $('.badge').html(data);
                            $('.number-course').html(data);
                            $('.nbtet').html(data);
                            $('.cart_show').show();
                        }
                    });
                });
            } else {
                $('.btn-load-more').remove();
            }
        }
    });
    setTimeout(function () {
        var count = $('.nbtet').text();
        var number = parseInt(count) + 1;
        if (number % 2 === 1) {
            toastr.success("Bạn được tặng thêm 1 khóa học miễn phí.");
        }
    }, 300);
});

//$('#exampleInputPhone').filter_input({regex: '^(\+{1,5}|0)?[0-9]'});

function checkName(name) {
    var filter = /^([a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚAÐIUOàáâãèéêìíòóôõùúadiuoUA??????????????????ua???????????????????????????????????????????????????????????????Ý????????? \\s])+$/;
    if (!filter.test(name)) {
        return false;
    }
    return true;
}

function checkEmail(email) {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!filter.test(email)) {
        return false;
    }

    return true;
}
function checkMobile(mobile) {
    var filter = /(09|08|016|012|018|849|8416|8412|8418|848)\d{8}/;
    if (!filter.test(mobile)) {
        return false;
    }
    return true;
}

$('.parity-addcart').click(function () {
    var id = $(this).attr('data-cid');
    $.ajax({
        url: '/parity/addtocart',
        type: 'POST',
        data: {id: id},
        success: function (result) {
            if (result.success) {
                $('.dg-nummber-cart').text(result.data.count_items);
                $('.number-course').text(result.data.count_items);
                if (result.data.count_items % 2 == 0) {
                    $('.block_tooltip').html('<div class="tool-tip"><b><p>*Mua 1 tặng 1* : </p></b>Mua càng nhiều được tặng càng nhiều. <p style="margin-top:5px;">TIẾP TỤC CHỌN!</p></div>');
                } else {
                    $('.block_tooltip').html('<div class="tool-tip"><p>Bạn được tặng 1 khoá học <b>hãy chọn ngay!</b></p></div>');
                }
            }
        }
    });
});

function buildUrl(key, value) {
    var params = hashParam();
    var string_search = "";
    $i = 0;
    var isset_key = false;
    $.each(params, function (index, val) {
        if ($i == 0) {
            if (key == index) {
                string_search += "?" + index + "=" + value;
                isset_key = true;
            } else {
                string_search += "?" + index + "=" + val;
            }
        } else {
            if (key == index) {
                string_search += "&" + index + "=" + value;
                isset_key = true;
            } else {
                string_search += "&" + index + "=" + val;
            }

        }
        $i++;
    });
    if (params != null) {
        if (typeof key != 'undefined' && typeof value != 'undefined' && !isset_key) {
            string_search += "&" + key + "=" + value;
        }
    } else {
        string_search += "?" + key + "=" + value;
    }
    return string_search;
}

function hashParam() {
    var urlParams = null;
    var match,
        pl = /\+/g, // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) {
            return decodeURIComponent(s.replace(pl, " "));
        },
        query = window.location.search.substring(1);
    if (query != '') {
        urlParams = {};
    }
    while (match = search.exec(query))
        urlParams[decode(match[1])] = decode(match[2]);
    return urlParams;
}

$('#search_btn').click(function () {
    var keyword = $('input[name=keyword]').val();
    var replaced = keyword.split(' ').join('+');
    //var string_push = buildUrl('key', replaced);
    location.href = '/donggia?key=' + replaced;
});

$('select[name=search_course]').change(function () {
    var keyword = $('select[name=search_course]').val();
    //var string_push = buildUrl('c', keyword);
    location.href = '/donggia?c=' + keyword;
});

function getByPrice1by1(price) {
    //var data = buildUrl();
    //var string_push = buildUrl('price', price);
    location.href = '/donggia?price=' + price;
}

function login() {
    FB.login(function (response) {
        if (response.status === 'connected') {
            var url = window.location.href;
            var arguments = url.split('?');
            var ip = $('body').find('input[name=ip]').val();
            getInfo(arguments[1], ip);
        } else if (response.status === 'not_authorized') {
            console.log(response.status);
        } else {
            console.log(response.status);
        }

    }, {scope: 'email'});
}
// get user basic info

function getInfo(params, ip) {
    FB.api('/me', 'GET', {fields: 'id, name, email, link, birthday, gender'}, function (response) {
        console.log(response);
        response.getData = params;
        response.ip = ip;
        $.ajax({
            url: '/course_action/login_fb',
            type: 'post',
            data: response,
            success: function (response) {
                if (response.success) {
//                        window.location.href = response.url;
                    location.reload();
                } else {
                    $('.form-sing-in-up').append('<div class="alert alert-danger alert-dismissable fade in">' +
                        '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' + response.message + '</div>')
                }
            }
        })
    });
}

$('.final-button').click(function () {
    var course = $('select[name=course_id]').val();
    var vn_score = $('input[name=vietnam_score]').val();
    var other_score = $('input[name=other_score]').val();

    if (course == '') {
        alert('Vui lòng chọn khóa học');
        return false;
    }
    if (vn_score == '') {
        alert('Vui lòng nhập tỉ số đội Việt Nam');
        return false;
    }
    if (other_score == '') {
        alert('Vui lòng nhập tỉ số đội UZBEKISTAN');
        return false;
    }

});

var parity = {};

parity.delCart = function(obj, course_id){
    $.ajax({
        url: '/parity/delcart',
        type: 'post',
        data : {course_id: course_id},
        success: function (result) {
            if (result.success) {
                $(obj).parents('.dg-list-course').remove();
                $('.nbtet').text(result.data);
                $('.cart_count').text(result.data);
                $('a[data-cid='+ course_id +']').removeClass('choosed');
                $('a[data-cid='+ course_id +']').find('.dg-txt-buy').text('Chọn khóa học');
            }
        }
    })
};

$('.btn-tet-cart').click(function(){
    $.ajax({
        url: '/parity/getcartdata',
        type: 'post',
        success: function (result) {
            if (result.success) {
                $('.dg-block-left').html(result.data);
            }
        }
    })
});