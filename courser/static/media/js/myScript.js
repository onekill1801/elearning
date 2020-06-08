
$(function() {
        $(window).scroll(function() {
            if ($(this).scrollTop() != 0) {
                $('#bttop').fadeIn();
            } else {
                $('#bttop').fadeOut();
            }
        });
        $('#bttop').click(function() {
            $('body,html').animate({scrollTop: 0}, 1000);
        });
    });

    $.extend($.easing, {
        easeOutBack: function(x, t, b, c, d, s) {
            if (s == undefined)
                s = 1.70158;
            return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
        },
        easeInBack: function(x, t, b, c, d, s) {
            if (s == undefined)
                s = 1.70158;
            return c * (t /= d) * t * ((s + 1) * t - s) + b;
        }
    });

    /*-------------------------------
     
     GALLERY SPECIFIC CODE
     
     -------------------------------*/

    /*---------------------
     
     SETTINGS
     
     */

    var gallerySettings = {
        markup: '' +
                '<div class="popup">' +
                '<div class="popup_wrap">' +
                '<div class="popup_content"/>' +
                '</div>' +
                '<a href="#next">Next</a>' +
                '<a href="#prev">Previous</a>' +
                '</div>',
        // This is a custom variable
        gallery: '.popup_gallery',
        replaced: function($popup, $back) {

            var plugin = this,
                    $wrap = $('.popup_wrap', $popup);

            // Animate the popup to new size
            $wrap.animate({
                width: $wrap.children().children().outerWidth(true),
                height: $wrap.children().children().outerHeight(true)
            }, {
                duration: 500,
                easing: 'easeOutBack',
                step: function() {

                    // Need to center the poup on each step
                    $popup
                            .css({
                                top: plugin.getCenter().top,
                                left: plugin.getCenter().left
                            });

                },
                complete: function() {

                    // Fade in!
                    $wrap
                            .children()
                            .animate({opacity: 1}, plugin.o.speed, function() {
                                plugin.center();
                                plugin.o.afterOpen.call(plugin);
                            });

                }
            });
        },
        show: function($popup, $back) {

            var plugin = this,
                    $wrap = $('.popup_wrap', $popup);

            // Center the plugin
            plugin.center();

            // Default fade in
            $popup
                    .animate({opacity: 1}, plugin.o.speed, function() {
                        plugin.o.afterOpen.call(plugin);
                    });

            // Set the inline styles as we animate later
            $wrap.css({
                width: $wrap.outerWidth(true),
                height: $wrap.outerHeight(true)
            });

        },
        afterClose: function() {
            this.currentIndex = undefined;
        }

    };

   

    /*---------------------
     
     JQUERY EASING
     
     */

    $.extend($.easing, {
        easeOutBack: function(x, t, b, c, d, s) {
            if (s == undefined)
                s = 1.70158;
            return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
        },
        easeInBack: function(x, t, b, c, d, s) {
            if (s == undefined)
                s = 1.70158;
            return c * (t /= d) * t * ((s + 1) * t - s) + b;
        }
    });



    function show(id) {
        $('#lesson_description_' + id).toggle();
        return false;
    }
    function quanTam(id, obj) {
        $.ajax({
            url: '/course_action/add_quan_tam',
            type: 'POST',
            dateType: 'text',
            data: {
                'course_id': id,
            },
            success: function(resp) {
                if (resp.success) {
//                    $(obj).html('<img src="/icon/like.png" /> Quan tâm ');
                    if (resp.data.Favorited == 1) {
                        $(obj).parents('.quantam').find('.btnQuantam').html('<img class="float-left margin-left-10" width="16px" height="15px" src="/icon/like.png" /> <span>Quan tâm</span><div class="both"></div>');
                    } else {
                        $(obj).parents('.quantam').find('.btnQuantam').html('<i class="icon"></i> Quan tâm');
                    }
                }
                ;
            }
        });
    }
    $(document).ready(function() {

//        $.each($('.danhsachbaihoc .thoigian'), function(){
//            $(this).text($(this).text().substring(3,8));
//        });
        /*
         $('#header .userlogin .ava').click(function() {
         $(".thongbao").hide();
         $(this).next().stop().slideToggle(200);
         });
         */


        /*hover on thumb*/
        $(".box").hover(function() {
            $(this).find('.box-hover').fadeIn(100);
            $(".hover_on_image").show();
        },
                function() {
                    $(this).find('.box-hover').fadeOut(100);
                    $(".hover_on_image").hide();
                });


        /* trang chi tiết */
        $('.thongtinNav li a').click(function() {
            $('.thongtinNav li a.active').removeClass('active');
            var class_a = $(this).attr('class');
            $(this).addClass('active');
            //$('.thongtinkhoahoc div.active').removeClass('active');
            //$('.thongtinkhoahoc ' + '.' + class_a).addClass('active');
        });
        /* trang tổng quan */
        $('.baihocTab2 a').click(function() {
            $('.baihocTab2 a.active').removeClass('active');
            $(this).addClass('active');
        });

        /* trang chủ*/
        /*
         $('#danhsachmoinhat').hide();
         
         $('#moinhat').click(function(){
         $('.khoahocSubnav li a.active').removeClass('active');
         $(this).addClass('active');
         $('#danhsachnoibat').hide("fast");
         $('#danhsachmoinhat').show("fast");
         });
         
         $('#noibat').click(function(){
         $('.khoahocSubnav li a.active').removeClass('active');
         $(this).addClass('active');
         $('#danhsachmoinhat').hide("fast");
         $('#danhsachnoibat').show("fast");
         });
         */

        /* kích hoạt mã */
        $('.btn_active_key').click(function() {
            var order_id = $(this).val();
            var key = $('.' + order_id).val();
            key = $.trim(key);
            $.ajax({
                type: 'POST',
                url: '/course_action/check_activate_key',
                data: {
                    'key': key
                },
                success: function(data) {
                    if (!$.isNumeric(data)) {
                        $('.error_' + order_id).html(data);
                    } else {
                        $('.btnDongy').attr('href', "/learn/" + data + "/overview");
                        $('.popup_success_' + order_id).bPopup({
                            speed: 350,
                            transition: 'slideIn',
                            transitionClose: 'slideBack',
                            opacity: 0.6,
                            positionStyle: 'fixed', //'fixed' or 'absolute'
                            modalColor: 'blueYellow',
                            onClose: function() {
                                location.href = "/learn/" + data + "/overview";
                            }
                        });
                    }
                }
            });
        });
        /* kích hoạt mã coupon */
        $('.btn_active_key_coupon').click(function() {

            var key = $('.key_active_one').val();

            $.ajax({
                type: 'POST',
                url: '/user/test',
                data: {
                    'Code': key
                },
                success: function(data) {

                    $('.btnDongy').attr('href', "/learn/" + data + "/overview");

                }
            });
        });
        $('.btn_active_key_one').click(function() {

            var key = $('.key_active_one').val();
            key = $.trim(key);
            $.ajax({
                type: 'POST',
                url: '/course_action/check_activate_key',
                data: {
                    'key': key
                },
                success: function(data) {
                    if (!$.isNumeric(data)) {
                        $('.error').html(data);
                    } else {
                        $('.btnDongy').attr('href', "/learn/" + data + "/overview");
                        $('.popup_success').bPopup({
                            speed: 350,
                            transition: 'slideIn',
                            transitionClose: 'slideBack',
                            opacity: 0.6,
                            positionStyle: 'fixed', //'fixed' or 'absolute'
                            modalColor: 'blueYellow',
                            onClose: function() {
                                location.href = "/learn/" + data + "/overview";
                            }
                        });
                    }
                }
            });
        });


        /* ghi chú */
        $('#add_note').click(function() {
            $('.notes').show('slow');
        });

        $('#btn_add_note').click(function() {
            var course_id = $('#note_course_id').val();
            var lesson_id = $('#note_lesson_id').val();
            var content = $('#note').val();
            $.ajax({
                type: 'POST',
                url: '/course_action/update_notes',
                data: {
                    'course_id': course_id,
                    'lesson_id': lesson_id,
                    'content': content
                },
                success: function(data) {
                    alert('Thêm thành công!');
                }
            });
        });
        /* end ghi chú */
        $('.error').click(function() {
            $('.content').bPopup({
                speed: 350,
                transition: 'slideIn',
                transitionClose: 'slideBack',
                opacity: 0.6,
                positionStyle: 'fixed', //'fixed' or 'absolute'
                modalColor: 'greenYellow'
            });
        });
        /*
         $('.coupon').click(function() {
         $('.content_coupon').bPopup({
         speed: 350,
         transition: 'slideIn',
         transitionClose: 'slideBack',
         opacity: 0.6,
         positionStyle: 'fixed', //'fixed' or 'absolute'
         modalColor: 'greenYellow',
         onClose: function() {
         $('.error_message').hide();
         }
         });
         });
         */



        $('.btn-submit-report').click(function() {
            var course_title = $('#course_title').val();
            var content = $('#content').val();
            $.ajax({
                'type': 'POST',
                'url': '/course_action/send_error',
                'data': {
                    'course_title': course_title,
                    'content': content,
                }
            });
        });


    });


function laylink(data, id, coursealias, aff) {
  //  $('.btnLaylink').click(function() {
        if (aff != '')
        {
            $('#linkcoupon').val('http://unica.vn/' + coursealias + '?aff=' + aff + '&coupon=' + id);
        } else {
            $('#linkcoupon').val('http://unica.vn/' + coursealias + '?coupon=' + id);
        }
        $('.popup.getlink').fadeIn(200);
  //  });
}
;
function laylinkaffiliate(data, course, userid) {

   // $('.btnLaylinkaff').click(function() {

        $('#linkaff').val('http://unica.vn/' + course + '?aff=' + userid);
        $('#linksrc').val('http://unica.vn/' + course + '?src=');
        $('.popup.getlinkaff').fadeIn(200);
    //});
}

function laylinkcoupon(data, course, userid) {

   // $('.btnLaylinkaff').click(function() {

        $('#linkcoupon').val('http://unica.vn/' + course + '?coupon=' + userid);
        
        $('.popup.getlinkcoupon').fadeIn(200);
    //});
}
function laylinkviral(url, userid) {

 

        $('#linkviral').val('http://unica.vn/free/' + url + '?aff=' + userid);
        
        $('.popup.getlinkviral').fadeIn(200);
   
}
function newdata(data) {
    $('#mcoupon-code').val('');
    $('#mcoupon-newprice').val('');
    $('#todate').val();
    $('#mcoupon-num_max').val('');
    $('#mcoupon-ID').val('0');
  $('h4').text('Tạo một coupon');
    $('.select_check').prop("disabled", false);
    $('#mcoupon-code').prop("disabled", false);

    //popup.open('note-popup', 'Upload VIDEO', tmpl('/create_course/unc_template_upvideo.tpl', {data: {id: id}}), [], 'modal-lg');
}
function newdatasell(data) {
    $('#mcoupon-code').val('');
    
  
   
    $('#mcoupon-ID').val('0');
    $('.h6').text('Tạo Coupon để bán');
    $('.select_check').prop("disabled", false);
    $('#mcoupon-code').prop("disabled", false);
}
function getdata(data) {

    var data_id = $(data).attr('data-id');
                        
     var code = $('#mcoupon-code').val();
    var newprice = $('#mcoupon-newprice').val();
    var todate = $('#todate').val();
    var num_max = $('#mcoupon-num_max').val();

    $.ajax({
        url: '/user/Findmodelcoupon',
        type: 'POST',
        data: {
            'data_id': data_id,
          
        },
        success: function(resp) {
            if (resp.success) {
                $('h4').text('Sửa coupon');
                $('#mcoupon-code').val(resp.data.Code);
                $('#mcoupon-newprice').val(resp.data.New_price);
                $('#todate').val(resp.data.To_date);
                $('#mcoupon-num_max').val(resp.data.Num_max);
                $('#mcoupon-ID').val(resp.data.ID);
                $('.select_check').val(resp.data.Course_id);
                $('.select_check').prop("disabled", true);
               
            } else {
                alert(resp.message);
            }
        }
    });

}
function getdatalession(data) {

    var data_id = $(data).attr('id_lesson');
                        
  
  

    $.ajax({
        url: '/user/Findmodellesson',
        type: 'POST',
        data: {
            'data_id': data_id,
          
        },
        success: function(resp) {
            if (resp.success) {
              
                $('#lesson_name').val(resp.data.Name);
                $('#lesson_id').val(resp.data.id);
              
               
            } else {
                alert(resp.message);
            }
        }
    });

}
var total = {};
$(document).ready(function() {
    var b = true;
    var x = true;

    var pathname = window.location.pathname;
    $.each($('.left li > a'), function() {
        if ($(this).attr('href') == pathname) {
            $(this).addClass('active');
        }
    });

    $('#backtotop').hide();
    $(window).scroll(function() {
        if ($(this).scrollTop() >= 135) {
            $('#backtotop').fadeIn();
        } else {
            $('#backtotop').fadeOut();
        }
    });
total.checkInbox = function() {
    var checked = []
    $("input[name='selection[]']:checked").each(function()
    {
        checked.push(parseInt($(this).val()));
    });
    if (checked.length <= 0)
        alert('Vui lòng chọn mã coupon cần in');
    else
        location.href = '/print-coupon-sell/' + checked.join();
};

total.checkInboxsell = function() {
    var checked = []
    $("input[name='selection[]']:checked").each(function()
    {
        checked.push(parseInt($(this).val()));
    });
    if (checked.length <= 0)
        alert('Vui lòng chọn mã coupon cần xuất excel');
    else
        location.href = '/excel-coupon-sell/' + checked.join();
};


    $('.btnTaokhoahoc').click(function() {
        $('.popup.taokhoahoc').fadeIn(200);
    });
    $('#btnTaocoupon').click(function() {
        $('.popup.taocoupon').fadeIn(200);
    });
    $('#btnTaocouponht').click(function() {
        $('.popup.taocouponht').fadeIn(200);
    });
    $('.btnUpdatecoupon').click(function() {
        $('.popup.taocoupon').fadeIn(200);
    });
$('.btnUpdatelession').click(function() {
        $('.popup.updatelession').fadeIn(200);
    });
 $('#thietlapexport').click(function() {
        $('.popup.thietlapexport').fadeIn(200);
    });
 $('#thietlapin').click(function() {
        $('.popup.thietlapin').fadeIn(200);
    });
    $('.popup_close').click(function() {
        $('.popup').fadeOut(0);
    });
    $("#backtotop").click(function() {
        $("html, body").animate({scrollTop: 0}, 800).animate({scrollTop: 10}, 100);
    });


    $('#header .navTop .btnNav').click(function() {
        $('#header .user ul').stop().slideUp(200);
        if (b) {
            $('#header .navTop #homeNav').stop().show().animate({'top': '100px', 'opacity': '1'}, 200);
            b = false;
        }
        else {
            $('#header .navTop #homeNav').stop().animate({'top': '148px', 'opacity': '0'}, 200).hide(200);
            b = true;
        }
    });
    //});
    /* $('#header .userlogin .popupcanhan').stop().slideUp(200); 
     $('#header .userlogin .thongbao').stop().slideUp(200);
     $('#header .user ul').stop().slideUp(200);
     if(b){
     $('#header .navTop #homeNav').stop().show().animate({'top':'100px', 'opacity':'1'}, 200);
     b = false;
     }
     else{
     $('#header .navTop #homeNav').stop().animate({'top':'148px', 'opacity':'0'}, 200).hide(200);
     b = true;
     }
     });
     */

    $('#content').click(function() {
        $('#header .navTop #homeNav').stop().animate({'top': '148px', 'opacity': '0'}, 200).hide(200);
        b = true;
    });

$('#content .taokhoahoc .contentTaokhoahoc .right .lichsugiaodich ul li a').click(function() {
        $('#content .taokhoahoc .contentTaokhoahoc .right .lichsugiaodich .khoahocSubnav li a').removeClass();
        $(this).addClass('active');
    });

    $('#content .khoahocnoibat .khoahocSubnav li a').click(function() {
        $('#content .khoahocnoibat .khoahocSubnav li a').removeClass();
        $(this).addClass('active');
    });
});
if($("#content .nhanxet .danhsachnhanxet").is(":visible")){
	$("#content .nhanxet .danhsachnhanxet").owlCarousel({
		items: 2,
		itemsCustom: [[0, 1], [641, 2]],
		navigation: false,
		navigationText: ["", ""],
		pagination: true,
		//paginationNumbers : false,
		autoPlay: true,
		stopOnHover: false,
		slideSpeed: 200,
		paginationSpeed: 600,
		rewindSpeed: 800,
	});
}
if($("#content .slide").is(":visible")){
	$("#content .slide").owlCarousel({
		items: 1,
		itemsCustom: [[0, 1], ],
		navigation: false,
		navigationText: ["", ""],
		pagination: false,
		//paginationNumbers : false,
		autoPlay: 10000,
		stopOnHover: false,
		//slideSpeed: 400,
		//paginationSpeed: 6000,
		//rewindSpeed: 5000,
	});
}
if($(".danhsachgiangvien .danhsach").is(":visible")){
	$(".danhsachgiangvien .danhsach").owlCarousel({
		items: 4,
		itemsCustom: [[0, 1], [481, 2], [750, 3], [936, 4]],
		navigation: true,
		navigationText: ["", ""],
		pagination: false,
		//paginationNumbers : false,
		autoPlay: true,
		stopOnHover: false,
		slideSpeed: 400,
		paginationSpeed: 600,
		rewindSpeed: 800,
	});
}
if($("#content .bancothehocgi ul").is(":visible")){
	$("#content .bancothehocgi ul").owlCarousel({
		items: 4,
		itemsCustom: [[0, 1], [361, 2], [481, 3], [769, 4], ],
		navigation: false,
		navigationText: ["", ""],
		pagination: false,
		//paginationNumbers : false,
		autoPlay: true,
		stopOnHover: false,
		slideSpeed: 200,
		paginationSpeed: 600,
		rewindSpeed: 800,
	});
}
$('.danhgiakhoahoc .danhsachdanhgia .danhgia1 .btnTraloi').click(function() {
    $(this).next().slideDown(200);
    $(this).next().children('.vietdanhgia').children('.nhapnoidung').children('textarea').focus();
});

$('#header .userlogin .ava').click(function() {
    $('#header .userlogin .popupcanhan').stop().slideToggle(200);
    $('#header .userlogin .thongbao').stop().slideUp(200);
    $('#header .navTop #homeNav').stop().animate({'top': '148px', 'opacity': '0'}, 200).hide(200);
    b = true;
});

$('#header .user .user_icon').click(function() {
    $('#header .user ul').stop().slideToggle(200);
    $('#header .navTop #homeNav').stop().animate({'top': '148px', 'opacity': '0'}, 200).hide(200);
    b = true;
});

$('#header .userlogin .btnThongbao').click(function() {
    $('#header .userlogin .thongbao').stop().slideToggle(200);
    $('#header .userlogin .popupcanhan').stop().slideUp(200);
    $('#header .navTop #homeNav').stop().animate({'top': '148px', 'opacity': '0'}, 200).hide(200);
    b = true;
});

$('#content').click(function() {
    $('#header .userlogin .popupcanhan').stop().slideUp(0);
    $('#header .userlogin .thongbao').stop().slideUp(0);
    $('#header .navTop #homeNav').stop().animate({'top': '148px', 'opacity': '0'}, 200).hide(200);
    b = true;
});

$('#content .chitietkhoahoc.chitietbaihoc .left .tailieu .tailieuTab li a').click(function() {
    $('#content .chitietkhoahoc.chitietbaihoc .left .tailieu .tailieuTab li a').removeClass('active');
    $(this).addClass('active');
});


$('#content .chitietkhoahoc.chitietbaihoc .left .tailieu .tailieuTab li a#ghichuBtn').click(function() {
    $('#content .chitietkhoahoc.chitietbaihoc .left .tailieu .noidungtailieu').stop().slideUp(200);
    $('#content .chitietkhoahoc.chitietbaihoc .left .tailieu .noidungtailieu#ghichu').stop().slideDown(200);
});

$('#content .chitietkhoahoc.chitietbaihoc .left .tailieu .tailieuTab li a#tailieubaiBtn').click(function() {
    $('#content .chitietkhoahoc.chitietbaihoc .left .tailieu .noidungtailieu').stop().slideUp(200);
    $('#content .chitietkhoahoc.chitietbaihoc .left .tailieu .noidungtailieu#tailieubaihoc').stop().slideDown(200);
});

$('#content .chitietkhoahoc.chitietbaihoc .left .tailieu .tailieuTab li a#tailieukhoaBtn').click(function() {
    $('#content .chitietkhoahoc.chitietbaihoc .left .tailieu .noidungtailieu').stop().slideUp(200);
    $('#content .chitietkhoahoc.chitietbaihoc .left .tailieu .noidungtailieu#tailieukhoahoc').stop().slideDown(200);
});

//Thanh toán JS
$('#content .thanhtoan .noidungthanhtoan .left .buoc1 .hinhthucthanhtoan li:nth-child(2) .noidunghinhthuc').slideDown(0);
//$('#content .thanhtoan .noidungthanhtoan .left .buoc1 .hinhthucthanhtoan li').click(function() {
//    $('#content .thanhtoan .noidungthanhtoan .left .buoc1 .hinhthucthanhtoan li .noidunghinhthuc').stop().slideUp(200);
//    $(this).children('.noidunghinhthuc').stop().slideToggle(200);
//});
//
//$('#content .thanhtoan .noidungthanhtoan .left .buoc1 .hinhthucthanhtoan li').click(function() {
//    $('#content .thanhtoan .noidungthanhtoan .left .buoc1 .hinhthucthanhtoan li').removeClass('active');
//    $(this).addClass('active');
//});
//
//$('#content .thanhtoan .noidungthanhtoan .left .buoc1 .hinhthucthanhtoan li#hinhthuckhac').click(function() {
//    $('#content .thanhtoan .noidungthanhtoan .left .buoc1 .hinhthucthanhtoan li.etc').stop().slideToggle(200);
//});

//$('body').on('click', '#content .thanhtoan .noidungthanhtoan .left .buoc3 .hinhthucthanhtoan li', function() {
//    $('#content .thanhtoan .noidungthanhtoan .left .buoc3 .hinhthucthanhtoan li .noidunghinhthuc').stop().slideUp(200);
//    $(this).children('.noidunghinhthuc').stop().slideToggle(200);
//    $('#content .thanhtoan .noidungthanhtoan .left .buoc3 .hinhthucthanhtoan .etc').stop().slideUp(200);
//});

$('body').on('click', '.cod-toggle', function() {
    //$('.sh1').stop().slideToggle(200);
    //$('.sh2').hide();
    //$('select[name=district]').prop('required', true);
    //$('#content .thanhtoan .noidungthanhtoan .left .buoc3 .hinhthucthanhtoan .etc').hide();
});
/*
$('body').on('click', '.tranfer-toggle', function() {
    $('.sh2').stop().slideToggle(200);
    $('.sh1').hide();
    $('.atm').hide();
    $('.visa').hide();
    $('select[name=district]').removeAttr('required');
    //$('#content .thanhtoan .noidungthanhtoan .left .buoc3 .hinhthucthanhtoan .etc').hide();
});
*/
/*
$('body').on('click', '.etc', function() {
    var id = $(this).attr('id');
    $('.sh2').hide();
    $('.sh1').hide();
    //$('.'+id).show();
    $('select[name=district]').removeAttr('required');
    //$('#content .thanhtoan .noidungthanhtoan .left .buoc3 .hinhthucthanhtoan .etc').hide();
});
*/

$('body').on('click', '#content .thanhtoan .noidungthanhtoan .left .buoc3 .hinhthucthanhtoan li', function() {
    $('#content .thanhtoan .noidungthanhtoan .left .buoc3 .hinhthucthanhtoan li').removeClass('active');
    $(this).addClass('active');
});

$('body').on('click', '#content .thanhtoan .noidungthanhtoan .left .buoc3 .hinhthucthanhtoan li#hinhthuckhac', function() {
    $('#content .thanhtoan .noidungthanhtoan .left .buoc3 .hinhthucthanhtoan li.etc').stop().slideToggle(200);
    $('.sh1').hide();
    $('.sh2').hide();
});


$('body').on('click', '#content .thanhtoan .noidungthanhtoan .left .buoc3 .hinhthucthanhtoan li#cod-toggle', function() {
    $('#content .thanhtoan .noidungthanhtoan .left .buoc3 .hinhthucthanhtoan .cod-toggle').stop().slideToggle(200);
    $('.sh1').hide();
    $('.sh2').hide();
    $('.cod-toggle').show();
    $('#cod-toggle').show();
});

$('body').on('click', '#content .thanhtoan .noidungthanhtoan .left .buoc3 .hinhthucthanhtoan li#nganluong', function() {
    $('.hinhthucthanhtoan .nganluong').show();
    //$('.hinhthucthanhtoan .nganluong').stop().slideToggle(200);
    $('.sh1').hide();
    $('.sh2').hide();
    $('.nganluong').show();
});
$('body').on('click', '#content .thanhtoan .noidungthanhtoan .left .buoc3 .hinhthucthanhtoan li#tranfer-toggle', function() {
    
    $('.hinhthucthanhtoan .tranfer-toggle').show();
    //$('.hinhthucthanhtoan .nganluong').stop().slideToggle(200);
    $('.sh1').hide();
    $('.sh2').hide();
    $('select[name=district]').removeAttr('required');
    $('input[name=address]').removeAttr('required');
    $('.tranfer-toggle').show();
});

$('body').on('click', '#content .thanhtoan .noidungthanhtoan .left .buoc3 .hinhthucthanhtoan li#cod-toggle', function() {
    
    $('.hinhthucthanhtoan .cod-toggle').css("display","block !important");
    //$('.hinhthucthanhtoan .nganluong').stop().slideToggle(200);
    $('.sh1').hide();
    //$('.sh2').hide();
    //$('select[name=district]').removeAttr('required');
    //$('input[name=address]').removeAttr('required');
    //$('.cod-toggle').show();
});

$('body').on('click', '#content .thanhtoan .noidungthanhtoan .left .buoc3 .hinhthucthanhtoan li#paypal', function() {
    $('.hinhthucthanhtoan .paypal').show();
    $('.sh1').hide();
    $('.sh2').hide();
    $('.paypal').show();
});
$('body').on('click', '#content .thanhtoan .noidungthanhtoan .left .buoc3 .hinhthucthanhtoan li#inet', function() {
    $('.hinhthucthanhtoan .inet').show();
    $('.sh1').hide();
    $('.sh2').hide();
    $('.inet').show();
});


$('body').on('click', '#content .thanhtoan .noidungthanhtoan .left .buoc3 .hinhthucthanhtoan li#thecao', function() {
    $('.hinhthucthanhtoan .thecao').show();
    $('.sh1').hide();
    $('.sh2').hide();
    //$('.thecao').show();
});

$('body').on('click', '#content .thanhtoan .noidungthanhtoan .left .buoc3 .hinhthucthanhtoan li#atm', function() {
    $('.hinhthucthanhtoan .atm').css("display","block !important");
    $('.sh1').hide();
});
$('body').on('click', '#content .thanhtoan .noidungthanhtoan .left .buoc3 .hinhthucthanhtoan li#visa', function() {
    $('.hinhthucthanhtoan .visa').css("display","block !important");
    $('.sh1').hide();
});

$('body').on('click', 'button[data-lt=hieu]', function() {
    $('.sh1 input[name=address]').val('cknh');
});

//xoa khoi gio hang
$('.del_cart').click(function(){
    var r = confirm("Bạn chắc chắn muốn bỏ khóa học này chứ?");
    if (r == true) {
        var id = $(this).attr('id');
        var price_sale = $(this).attr('price_sale');
        var discount = $(this).attr('discount');
        $.ajax({
            type : 'POST',
            url : '/course_action/del_cart',
            data: {
                'id': id,
                'price_sale': price_sale,
                'discount': discount,
            },
            success: function(message){
                var res = message.split("-");
                $('div#'+id).remove();
                $('a#carts b').html(res[0]);
                $('div.tongtien b').html(res[1]);
                if(res[1] == '0 đ'){
                    window.location.reload();
                }
            }
        });
    } else {
        
    }

    
});


