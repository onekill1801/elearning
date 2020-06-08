var fee = {};
fee.init = function () {
    $.ajax({
        url: '/fee/getallcourse',
        type: 'POST',
        success: function (result) {
            if (result.success) {
                var course = [];
                $.each(result.data, function (index, val) {
                    course.push(val.Name);
                });
                $("#al_course").autocomplete({
                    source: course
                });
                $("#group_course").autocomplete({
                    source: course
                });
            }
        }
    });
};

Number.prototype.toMoney = function (decimals, decimal_sep, thousands_sep) {
    var n = this,
            c = isNaN(decimals) ? 2 : Math.abs(decimals), //if decimal is zero we must take it, it means user does not want to show any decimal
            d = decimal_sep || '.', //if no decimal separator is passed we use the dot as default decimal separator (we MUST use a decimal separator)

            t = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep, //if you don't want to use a thousands separator you can pass empty string as thousands_sep value

            sign = (n < 0) ? '-' : '',
            //extracting the absolute value of the integer part of the number and converting to string
            i = parseInt(n = Math.abs(n).toFixed(c)) + '',
            j = ((j = i.length) > 3) ? j % 3 : 0;
    return sign + (j ? i.substr(0, j) + t : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : '');
};

$('.code_coupon input[name=coupon]').keyup(function (e) {
    var code = e.keyCode ? e.keyCode : e.which;
    if (code == 13) {
        var name = $(this).parents('.tab-content').find('input[name=al_course]').val();
        var coupon = $(this).parents('.tab-content').find('input[name=coupon]').val();
        $('.generate_wallet').hide();
        $('.hinhthucthanhtoan').remove();
        $.ajax({
            url: '/fee/getone',
            type: 'POST',
            data: {name: name, coupon: coupon, count_data: 1, flag: 0},
            success: function (result) {
                if (result.success) {
                    $('.around_course').show();
                    $('.data_name').text(result.data.Name);
                    $('.data_img').attr('src', result.data.Banner_large);
                    $('.data_teacher').text(result.data.Teacher_ids);
                    $('#data_price').text(result.data.Price_root.toMoney(0));

                    if (typeof result.data.Price_sale != 'undefined' && result.data.Price_sale != 0) {
                        $('.uudai_hideshow').show();
                        $('.data_low_1').text(result.data.Discount_sale);
                        $('#data_code').text(result.data.Price_sale.toMoney(0));
                    } else {
                        $('.uudai_hideshow').hide();
                    }

                    if (typeof result.data.Price_rate != 'undefined' && result.data.Price_rate != 0) {
                        $('.hoahong_hideshow').show();
                        $('#data_rose').text(result.data.Price_rate.toMoney(0));
                        $('.data_low_2').text(result.data.Discount_rate);
                    } else {
                        $('.hoahong_hideshow').hide();
                    }
                    $('.alone_hide').hide();
                    $('.num_quantity').text(1);
                    $('#minus_after').text(result.data.Total_money.toMoney(0));
                    $('#total_price').text(result.data.Total_money.toMoney(0));
                }
            }
        });
    }
});

fee.getCourseData2 = function(){
	var name = $('#group_course').parents('.tab-content').find('input[name=group_course]').val();
        var count = $('#group_course').parents('.tab-content').find('input[name=count_data]').val();
        $('.generate_wallet').hide();
        $('.hinhthucthanhtoan').remove();
        $.ajax({
            url: '/fee/getone',
            type: 'POST',
            data: {name: name, count_data: count, flag: 1},
            success: function (result) {
                if (result.success) {
                    $('.around_course').show();
                    $('.data_name').text(result.data.Name);
                    $('.data_img').attr('src', result.data.Banner_large);
                    $('.data_teacher').text(result.data.Teacher_ids);
                    $('#data_price').text(result.data.Price_root.toMoney(0));
                    if (typeof result.data.Price_sale != 'undefined' && result.data.Price_sale != 0) {
                        $('.uudai_hideshow').show();
                        $('.data_low_1').text(parseInt(100 - result.data.Discount_sale));
                        $('#data_code').text(result.data.Price_sale.toMoney(0));
                    } else {
                        $('.uudai_hideshow').hide();
                    }

                    $('.hoahong_hideshow_giamgia').hide();
                    if (typeof result.data.Price_rate != 'undefined' && result.data.Price_rate != 0) {
                        $('.hoahong_hideshow').show();
                        $('#data_rose').text(result.data.Price_rate.toMoney(0));
                        $('.data_low_2').text(result.data.Discount_rate);
                    } else {
                        $('.hoahong_hideshow').hide();
                    }
                    $('#data_total').text(result.data.Total_money.toMoney(0));
                    var quantity = parseFloat($('input[name=count_data]').val());
                    var root_price = (result.data.Price_root * quantity);
                    var sale_price = (result.data.Price_sale * quantity);
                    var rose_price = (result.data.Price_rate * quantity);
                    var total_price = (result.data.Total_money * quantity);
                    caculate = {root_price: result.data.Price_root, sale_price: result.data.Price_sale, rose_price: result.data.Price_rate, totalPrice: result.data.Total_money};
                    $('.num_quantity').text(quantity);
                    $('.slxroot').text(root_price.toMoney(0));
                    $('.slxsale').text(sale_price.toMoney(0));
                    $('.slxrose').text(rose_price.toMoney(0));
                    $('#total_price').text(total_price.toMoney(0));
                    $('#minus_after').text(result.data.Total_money.toMoney(0));
                    $('html,body').animate({
                        scrollTop: $("#around_course").offset().top}, 'slow');
                }
            }
        });
}

fee.getCourseData = function(){
	var name = $('#al_course').parents('.tab-content').find('input[name=al_course]').val();
        var coupon = $('#al_course').parents('.tab-content').find('input[name=coupon]').val();
        $('.generate_wallet').hide();
        $('.hinhthucthanhtoan').remove();
        $.ajax({
            url: '/fee/getone',
            type: 'POST',
            data: {name: name, coupon: coupon, count_data: 1, flag: 0},
            success: function (result) {
                if (result.success) {
                    $('.around_course').show();
                    $('.data_name').text(result.data.Name);
                    $('.data_img').attr('src', result.data.Banner_large);
                    $('.data_teacher').text(result.data.Teacher_ids);
                    $('#data_price').text(result.data.Price_root.toMoney(0));

                    if (typeof result.data.Price_sale != 'undefined' && result.data.Price_sale != 0) {
                        $('.uudai_hideshow').show();
                        $('.data_low_1').text(result.data.Discount_sale);
                        $('#data_code').text(result.data.Price_sale.toMoney(0));
                    } else {
                        $('.uudai_hideshow').hide();
                    }

                    if (typeof result.data.Price_rate != 'undefined' && result.data.Price_rate != 0) {
                        $('.hoahong_hideshow').show();
                        $('#data_rose').text(result.data.Price_rate.toMoney(0));
                        $('.data_low_2').text(result.data.Discount_rate);
                    } else {
                        $('.hoahong_hideshow').hide();
                    }
                    $('.alone_hide').hide();
                    $('.num_quantity').text(1);
                    $('#minus_after').text(result.data.Total_money.toMoney(0));
                    $('#total_price').text(result.data.Total_money.toMoney(0));

                    $('html,body').animate({
                        scrollTop: $("#around_course").offset().top}, 'slow');
                }
            }
        });
}

$('#al_course').keyup(function (e) {
    var code = e.keyCode ? e.keyCode : e.which;
    if (code == 13) {
        var name = $(this).parents('.tab-content').find('input[name=al_course]').val();
        var coupon = $(this).parents('.tab-content').find('input[name=coupon]').val();
        $('.generate_wallet').hide();
        $('.hinhthucthanhtoan').remove();
        $.ajax({
            url: '/fee/getone',
            type: 'POST',
            data: {name: name, coupon: coupon, count_data: 1, flag: 0},
            success: function (result) {
                if (result.success) {
                    $('.around_course').show();
                    $('.data_name').text(result.data.Name);
                    $('.data_img').attr('src', result.data.Banner_large);
                    $('.data_teacher').text(result.data.Teacher_ids);
                    $('#data_price').text(result.data.Price_root.toMoney(0));

                    if (typeof result.data.Price_sale != 'undefined' && result.data.Price_sale != 0) {
                        $('.uudai_hideshow').show();
                        $('.data_low_1').text(result.data.Discount_sale);
                        $('#data_code').text(result.data.Price_sale.toMoney(0));
                    } else {
                        $('.uudai_hideshow').hide();
                    }

                    if (typeof result.data.Price_rate != 'undefined' && result.data.Price_rate != 0) {
                        $('.hoahong_hideshow').show();
                        $('#data_rose').text(result.data.Price_rate.toMoney(0));
                        $('.data_low_2').text(result.data.Discount_rate);
                    } else {
                        $('.hoahong_hideshow').hide();
                    }
                    $('.alone_hide').hide();
                    $('.num_quantity').text(1);
                    $('#minus_after').text(result.data.Total_money.toMoney(0));
                    $('#total_price').text(result.data.Total_money.toMoney(0));

                    $('html,body').animate({
                        scrollTop: $("#around_course").offset().top}, 'slow');
                }
            }
        });
    }

});

var caculate = null;

$('#group_course').keyup(function (e) {
    var code = e.keyCode ? e.keyCode : e.which;
    if (code == 13) {
        var name = $(this).parents('.tab-content').find('input[name=group_course]').val();
        var count = $(this).parents('.tab-content').find('input[name=count_data]').val();
        $('.generate_wallet').hide();
        $('.hinhthucthanhtoan').remove();
        $.ajax({
            url: '/fee/getone',
            type: 'POST',
            data: {name: name, count_data: count, flag: 1},
            success: function (result) {
                if (result.success) {
                    $('.around_course').show();
                    $('.data_name').text(result.data.Name);
                    $('.data_img').attr('src', result.data.Banner_large);
                    $('.data_teacher').text(result.data.Teacher_ids);
                    $('#data_price').text(result.data.Price_root.toMoney(0));
                    if (typeof result.data.Price_sale != 'undefined' && result.data.Price_sale != 0) {
                        $('.uudai_hideshow').show();
                        $('.data_low_1').text(parseInt(100 - result.data.Discount_sale));
                        $('#data_code').text(result.data.Price_sale.toMoney(0));
                    } else {
                        $('.uudai_hideshow').hide();
                    }

                    $('.hoahong_hideshow_giamgia').hide();
                    if (typeof result.data.Price_rate != 'undefined' && result.data.Price_rate != 0) {
                        $('.hoahong_hideshow').show();
                        $('#data_rose').text(result.data.Price_rate.toMoney(0));
                        $('.data_low_2').text(result.data.Discount_rate);
                    } else {
                        $('.hoahong_hideshow').hide();
                    }
                    $('#data_total').text(result.data.Total_money.toMoney(0));
                    var quantity = parseFloat($('input[name=count_data]').val());
                    var root_price = (result.data.Price_root * quantity);
                    var sale_price = (result.data.Price_sale * quantity);
                    var rose_price = (result.data.Price_rate * quantity);
                    var total_price = (result.data.Total_money * quantity);
                    caculate = {root_price: result.data.Price_root, sale_price: result.data.Price_sale, rose_price: result.data.Price_rate, totalPrice: result.data.Total_money};
                    $('.num_quantity').text(quantity);
                    $('.slxroot').text(root_price.toMoney(0));
                    $('.slxsale').text(sale_price.toMoney(0));
                    $('.slxrose').text(rose_price.toMoney(0));
                    $('#total_price').text(total_price.toMoney(0));
                    $('#minus_after').text(result.data.Total_money.toMoney(0));
                    $('html,body').animate({
                        scrollTop: $("#around_course").offset().top}, 'slow');
                }
            }
        });
    }
});
$('.generate_wallet').on('click', '.vn_atm', function () {
    var daily = $('.error_message').attr('flag-daily');
    var money = $('input[name=coin_card]').val();
    if (money == '') {
        showMesssage("Vui lòng nhập số tiền cần nạp.");
        return false;
    }

    if (daily == 1) {
        if (money < 5000000) {
            showMesssage("Bạn cần nạp tối thiểu 5.000.000đ");
            return false;
        }
    } else if (money < 2000) {
        showMesssage("Bạn cần nạp tối thiểu 100.000đ");
        return false;
    }

    $.ajax({
        url: '/fee/clickcard',
        type: 'POST',
        data: {money: money, urc: "_102"},
        success: function (result) {
            if (result.success) {
                location.href = result.data;
            }
        }
    });
});
$('.generate_wallet').on('click', '.vn_card', function () {
    var daily = $('.error_message').attr('flag-daily');
    var money = $('input[name=coin_card]').val();
    if (money == '') {
        showMesssage("Vui lòng nhập số tiền cần nạp.");
        return false;
    }
    if (daily == 1) {
        if (money < 5000000) {
            showMesssage("Bạn cần nạp tối thiểu 5.000.000đ");
            return false;
        }
    } else if (money < 100000) {
        showMesssage("Bạn cần nạp tối thiểu 100.000đ");
        return false;
    }
    $.ajax({
        url: '/fee/clickcard',
        type: 'POST',
        data: {money: money, urc: "_101"},
        success: function (result) {
            if (result.success) {
                location.href = result.data;
            }
        }
    });
});
$('.generate_wallet').on('click', '.vn_visa', function () {
    var daily = $('.error_message').attr('flag-daily');
    var money = $('input[name=coin_card]').val();
    if (money == '') {
        showMesssage("Vui lòng nhập số tiền cần nạp.");
        return false;
    }
    if (daily == 1) {
        if (money < 5000000) {
            showMesssage("Bạn cần nạp tối thiểu 5.000.000đ");
            return false;
        }
    } else if (money < 100000) {
        showMesssage("Bạn cần nạp tối thiểu 100.000đ");
        return false;
    }
    $.ajax({
        url: '/fee/clickcard',
        type: 'POST',
        data: {money: money, urc: "_103"},
        success: function (result) {
            if (result.success) {
                location.href = result.data;
            }
        }
    });
});
$('.generate_wallet').on('click', '.vn_paypal', function () {
    var daily = $('.error_message').attr('flag-daily');
    var money = $('input[name=coin_card]').val();
    if (money == '') {
        showMesssage("Vui lòng nhập số tiền cần nạp.");
        return false;
    }
    if (daily == 1) {
        if (money < 5000000) {
            showMesssage("Bạn cần nạp tối thiểu 5.000.000đ");
            return false;
        }
    } else if (money < 100000) {
        showMesssage("Bạn cần nạp tối thiểu 100.000đ");
        return false;
    }
    $.ajax({
        url: '/fee/clickcard',
        type: 'POST',
        data: {money: money, urc: "_104"},
        success: function (result) {
            if (result.success) {
                location.href = result.data;
            }
        }
    });
});
$('.generate_wallet').on('click', '.vn_nganluong', function () {
    var daily = $('.error_message').attr('flag-daily');
    var money = $('input[name=coin_card]').val();
    if (money == '') {
        showMesssage("Vui lòng nhập số tiền cần nạp.");
        return false;
    }
    if (daily == 1) {
        if (money < 5000000) {
            showMesssage("Bạn cần nạp tối thiểu 5.000.000đ");
            return false;
        }
    } else if (money < 100000) {
        showMesssage("Bạn cần nạp tối thiểu 100.000đ");
        return false;
    }
    $.ajax({
        url: '/fee/clickcard',
        type: 'POST',
        data: {money: money, urc: "_105"},
        success: function (result) {
            if (result.success) {
                location.href = result.data;
            }
        }
    });
});

function showMesssage(messages) {
    $('.error_show').text(messages).show();
//    setTimeout(function () {
//        $('.error_show').text(messages).hide();
//    }, 8000);
}

$('.plus').click(function () {
    var count = $('input[name=count_data]').val();
    if (count > 0) {
        var num = parseInt(count) + 1;
        $('input[name=count_data]').val(num);
        var quantity = parseFloat($('input[name=count_data]').val());
        var root_price = parseFloat(caculate.root_price * quantity);
        var sale_price = parseFloat(caculate.sale_price * quantity);
        var rose_price = parseFloat(caculate.rose_price * quantity);
        var total_price = parseFloat(caculate.totalPrice * quantity);
        $('.num_quantity').text(quantity);
        $('.slxroot').text(root_price.toMoney(0));
        $('.slxsale').text(sale_price.toMoney(0));
        $('.slxrose').text(rose_price.toMoney(0));
        $('#total_price').text(total_price.toMoney(0));
    }
});
$('.minus').click(function () {
    var count = $('input[name=count_data]').val();
    if (count > 10) {
        var num = parseInt(count) - 1;
        $('input[name=count_data]').val(num);
    }
    var quantity = parseFloat($('input[name=count_data]').val());
    var root_price = parseFloat(caculate.root_price * quantity);
    var sale_price = parseFloat(caculate.sale_price * quantity);
    var rose_price = parseFloat(caculate.rose_price * quantity);
    var total_price = parseFloat(caculate.totalPrice * quantity);
    $('.num_quantity').text(quantity);
    $('.slxroot').text(root_price.toMoney(0));
    $('.slxsale').text(sale_price.toMoney(0));
    $('.slxrose').text(rose_price.toMoney(0));
    $('#total_price').text(total_price.toMoney(0));
});
$('.btn-checkout').click(function () {
    var total_money = $('#total_price').text();
    var course_name = $('.data_name').text();
    var coupon = $('.code_coupon input[name=coupon]').val();
    var count_data = $('input[name=count_data]').val();
    $.ajax({
        url: '/fee/complete',
        type: 'POST',
        data: {total_money: total_money, name: course_name, coupon: coupon, count_data: count_data},
        beforeSend: function (xhr) {
            $('.loading').show();
        },
        complete: function (jqXHR, textStatus) {
            $('.loading').hide();
        },
        success: function (result) {
            if (result.success) {
                location.href = "/prepaid/thankyou";
            } else {
                showMesssage(result.message);
                $('.poor_site_1').show();
                $('.poor_site_1').text(result.message);
                setTimeout(function () {
                    $('.poor_site_1').hide();
                }, 5000);
            }
        }
    });
});

var delay = (function () {
    var timer = 0;
    return function (callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };
})();

$('.btn-addcard').click(function () {
    $('.around_course').hide();
    $.ajax({
        url: '/fee/drawhtml',
        type: 'POST',
        success: function (result) {
            if (result.success) {
                $('.generate_wallet').show();
                $('.add_card_content').html(result.data);
            }
        }
    });
});

$('.check_card_mobile').click(function () {
    $('.around_course').hide();
    $.ajax({
        url: '/fee/drawhtml',
        type: 'POST',
        success: function (result) {
            if (result.success) {
                $('.generate_wallet').show();
                $('.add_card_content').html(result.data);
                $('.hide_card_wallet').hide();
            }
        }
    });
});

$('.bring-back').click(function () {
    $('.generate_wallet').hide();
    $('.hide_card_wallet').show();
});

$('.generate_wallet').on('click', '.vn_tranfer', function () {
    var daily = $('.error_message').attr('flag-daily');
    var money = $('input[name=coin_card]').val();
    if (money == '') {
        showMesssage("Vui lòng nhập số tiền cần nạp.");
        return false;
    }
    if (daily == 1) {
        if (money < 5000000) {
            showMesssage("Bạn cần nạp tối thiểu 5.000.000đ");
            return false;
        }
    } else if (money < 100000) {
        showMesssage("Bạn cần nạp tối thiểu 100.000đ");
        return false;
    }
    $.ajax({
        url: '/fee/exchange',
        type: 'POST',
        data: {money: money},
        success: function (result) {
            if (result.success) {
                location.href = result.data;
            } else {
                showMesssage(result.message);
            }
        }
    });
});

$('.generate_wallet').on('click', '.vn_refresh', function () {
    if ($('.total_bank').css('display') == 'none') {
        $('.total_bank').show();
    } else {
        $('.total_bank').hide();
    }
});

var time_c = 60;
function sc(i, n, e, o, l, t) {
    var s = new Date;
    s.setTime(s.getTime() + 24 * e * 60 * 60 * 1e3), document.cookie = i + "=" + escape(n) + (null == s ? "" : "; expires=" + s.toGMTString()) + (null == o ? "" : "; path=" + o) + (null == l ? window.location.hostname : "; domain=" + l) + (null == t ? "" : "; secure")
}
function gurl() {
    for (var i, n = [], e = window.location.href.slice(window.location.href.indexOf("?") + 1).split("&"), o = 0; o < e.length; o++)
        i = e[o].split("="), n.push(i[0]), n[i[0]] = i[1];
    return n
}
var qs = gurl();
qs.link_id && sc("link_id", qs.link_id, time_c, "/", window.location.hostname);

fee.init();