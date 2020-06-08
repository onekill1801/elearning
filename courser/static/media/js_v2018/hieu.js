$('#contact_register').click(function () {
    var fullname = $('#fullname').val();
    var email = $('#email').val();
    if (fullname != '' && email != '') {
        $.ajax({
            type: 'POST',
            url: '/course_action/index_form',
            data: {
                'fullname': fullname,

                'email': email,
            },
            beforeSend: function () {
                // setting a timeout
                $('#contact_register').html('<img src="/icon/loader.gif"/> ... ');
            },
            success: function (data) {
                if (data == 'true') {
                    $('#contact_register').html('<img src="/icon/success.png" width="15px"/> OK!');
                } else {
                    $('#contact_register').html('<img src="/icon/delete.png" width="15px"/> Error!');
                }
            }
        });
    }
});

$('.box-slider').slick();
$('.unica-box-course-f').slick({
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 5,
    prevArrow: '<i class="fa fa-chevron-left" aria-hidden="true"></i>',
    nextArrow: '<i class="fa fa-chevron-right" aria-hidden="true"></i>',
    responsive: [
        {
            breakpoint: 1025,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 769,
            settings: {
                arrows: false,
                slidesToShow: 2,
                slidesToScroll: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                centerMode: true,
                arrows: false,
                slidesToShow: 1.2,
                slidesToScroll: 1
            }
        },
        // {
        //     breakpoint: 480,
        //     settings: "unslick"
        // },
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

$('.del_cart').click(function () {
    var r = confirm("Bạn chắc chắn muốn bỏ khóa học này chứ?");
    if (r == true) {
        var obj = $(this);
        var id = $(this).attr('id');
        var price_sale = $(this).attr('price_sale');
        var discount = $(this).attr('discount');
        var type = $(this).attr('type');
        $.ajax({
            type: 'POST',
            url: '/course_action/del_cart',
            data: {
                'id': id,
                'price_sale': price_sale,
                'discount': discount,
                'type': type,
            },
            success: function (message) {
                window.location.reload();
                if (message.success) {
                    if (message.data.count_item == 0) {
                        window.location.reload();
                    }
                    $('a#carts b').html(message.data.count_item);
                    $('.unica-sl-cart b').html(message.data.count_item);
                    $('.price-cart-1').html(message.data.Price_sale + '<sup>đ</sup>');
                    obj.parents('.u-cart-combo-course').remove();
                    $('.price-cart-box .pull-right').html(message.data.Price_origin + '<sup>đ</sup>');
                } else {
                    obj.parents('.u-cart-course').remove();
                    var res = message.split("-");
                    $('div#' + id).remove();
                    $('a#carts b').html(res[0]);
                    $('.tongtien').html(res[1]);
                    if (res[1] == '0 đ') {
                        window.location.reload();
                    }
                }
            }
        });
    }
});

//Giảm 10% khi thanh toán online
$('.col-cart-table').on('click', '.panel-default a', function () {
    var type = $(this).parents('.panel-default').attr('pay-type');
    var xhr = null;
    xhr = $.ajax({
        type: 'POST',
        url: '/favorite/tenpercent',
        data: {type: type},
        beforeSend : function(){
            if(xhr != null) { xhr.abort(); }
        },
        success: function (result) {
            if (result) {
                if (result.data.type) {
                    $('.sale-percent-online').css("display", "block");
                    $('.thanh_tien').html('<span class="thanh_tien">' + result.data.price + '<sup>đ</sup>');
                } else {
                    $('.sale-percent-online').css("display", "none");
                    $('.thanh_tien').html('<span class="thanh_tien">' + result.data.price + '<sup>đ</sup>');
                }

                if (type == 'visa_panel' && result.data.url != '') {
                    console.log(result.data.url);
                    $(".panel-default[pay-type=visa_panel]").find('.btn-cl-or').attr('href', result.data.url);
                }
            }
        }
    });
});


//$('#txtMobile').filter_input({regex: '^(\+{1,5}|0)?[0-9]'});
function addFavourite(model) {
    var course_id = $(model).attr('data-id');
    $.ajax({
        type: 'POST',
        url: '/course_action/add_quan_tam',
        data: {
            'Course_id': course_id
        },
        success: function (result) {
            if (result.success) {
                if (result.data.Favorited == 1) {
                    $(model).removeClass('unactive').addClass('active');
                } else {
                    $(model).removeClass('active').addClass('unactive');
                }

            }
        }
    });
}

function addcart(model) {
    $('.show-cart').css('display','block');
    var course_id = $(model).attr('data-id');
    $.ajax({
        type: 'POST',
        url: '/course_action/add_to_cart',
        data: {
            'Course_id': course_id
        },
        beforeSend: function () {
            $(model).html('<img src="/icon/loader.gif"/> Đang xử lý');
            $('.unica-sl-cart').parent().find('i').removeClass('heartBeat');
        },
        success: function (data) {
            $(model).html('<img src="/icon/success.png" width="15px"/> Đã thêm vào giỏ ');
            $('.unica-sl-cart').html(data);
            $('.unica-sl-cart').css('background' ,'#F26C4F');
            $('.unica-sl-cart').css('color' ,'white');
            $('.unica-sl-cart').parent().find('i').css('color' ,'#F26C4F');
            $('.unica-sl-cart').parent().find('i').addClass('heartBeat');
        }
    });
    showPopupCart(course_id);
}




function checkName(name) {
    var filter = /^([a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ \\s])+$/;
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
/*
 function checkMobile(mobile) {
 var filter = /(09|08|016|012|018|849|8416|8412|8418|848)\d{8}/;
 if (!filter.test(mobile)) {
 return false;
 }
 return true;
 }
 */
function checkForm() {
    if (frmRegister.txtName.value == '') {
        //alert('Vui lòng nhập họ tên');
        frmRegister.txtName.focus();
        return false;
    }
    if (frmRegister.txtEmail.value == '') {
        //alert('Vui lòng nhập email');
        frmRegister.txtEmail.focus();
        return false;
    }
    /*
     if (frmRegister.txtMobile.value == '') {
     //alert('Vui lòng nhập số điện thoại');
     frmRegister.txtMobile.focus();
     return false;
     }
     */

    /*
     if (!checkName(frmRegister.txtFullname.value)) {
     alert('Vui lòng nhập tên đúng định dạng');
     frmRegister.txtFullname.focus();
     return false;
     }
     */


    if (!checkEmail(frmRegister.txtEmail.value)) {
        alert('Vui lòng nhập email đúng định dạng');
        frmRegister.txtEmail.focus();
        return false;
    }

    /*
     if (!checkMobile(frmRegister.txtMobile.value)) {
     alert('Vui lòng nhập mobile đúng định dạng');
     frmRegister.txtMobile.focus();
     return false;
     }
     */

    frmRegister.submit();
}
$(document).ready(function () {
    $(".remove-navibar").click(function () {
        $("#js-bootstrap-offcanvas").trigger("offcanvas.toggle");
    });
});
/*
 $(".pop").popover({
 trigger: "manual",
 html: true,
 animation: false,
 content: function() {
 var content = $(this).parents('.box-pop').find('#popover-content').html();
 return content;
 //return 'xxx';
 //return $('#popover-content').html();
 }
 })
 */
$(".pop").popover({
    trigger: "manual",
    html: true,
    animation: false,
    content: function () {
        var content = $(this).parents('.box-pop').find('#popover-content').html();
        return content;
    }
}).on("mouseenter", function () {
    var _this = this;
    $(this).popover("show");
    $(".popover").on("mouseleave", function () {
        $(_this).popover('hide');
    });
}).on("mouseleave", function () {
    var _this = this;
    setTimeout(function () {
        if (!$(".popover:hover").length) {
            $(_this).popover("hide");
        }
    }, 0);
});

if($("#sidebar").is(":visible")){
    var stickySidebar = new StickySidebar('#sidebar', {
        bottomSpacing: 20,
        topSpacing: 75,
        containerSelector: '.u-detail-course',
        innerWrapperSelector: '.block-buy'
    });
}

$(function () {
    $('.lazy').lazy();
});