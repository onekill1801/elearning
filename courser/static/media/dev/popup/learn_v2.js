var learn = {};
$(function () {
//    $("#lp-content-wr").resizable({
//        handles: "e",
//        resize: function (event, ui) {
//            var wid = $('.sidebar-second').width();
//            var win_wid = $(window).width();
//            var result = win_wid - ui.size.width;
//            if (result * 100 / win_wid <= 40) {
//                $('.sidebar-second').css("width", result + "px");
//            } else {
//                var minWidth = win_wid - result;
//                $("#lp-content-wr").resizable("option", "minWidth", minWidth + 20);
//            }
//
//            if (wid * 100 / win_wid <= 20) {
//                var maxWidth = win_wid - result;
////                $("#lp-content-wr").resizable("option", "maxWidth", maxWidth - 20);
//            }
//
//            if (wid <= 400) {
//                $('span[data-commend=load_outline_data]').text("G.trình");
//                $('span[data-commend=load_learn_data]').text("T.luận");
//                $('span[data-commend=load_doc_data]').text("T.liệu");
//                $('span[data-commend=load_note_data]').text("G.chép");
//            } else {
//                $('span[data-commend=load_outline_data]').text("Giáo trình");
//                $('span[data-commend=load_learn_data]').text("Thảo luận");
//                $('span[data-commend=load_doc_data]').text("Tài liệu");
//                $('span[data-commend=load_note_data]').text("Ghi chép");
//            }
//
//        },
//    });
});
widthPlayer = null;
widthRight = null;
$('body').on('click', '#learn-panel-close', function () {
    if ($(this).find('i').attr('class') == 'fa fa-chevron-right') {
        widthPlayer = $('#lp-content-wr').width();
        widthRight = $('.sidebar-second').width();
        $('.sidebar-second').hide();
        $(this).find('i').removeClass('fa-chevron-right').addClass('fa-chevron-left');
        $('#lp-content-wr').css('width', '100%');
        $('.ui-resizable-handle').hide();
    } else if ($(this).find('i').attr('class') == 'fa fa-chevron-left') {
        $('.sidebar-second').show();
        $(this).find('i').removeClass('fa-chevron-left').addClass('fa-chevron-right');
        $('#lp-content-wr').css('width', widthPlayer);
        $('.sidebar-second').css('width', widthRight);
        $('.ui-resizable-handle').show();
    }
});
function showReplyData(_target) {
    $('.show_prepend_text').remove();
    var id = $(_target).parents('.danhgia1').attr('id');
    $.ajax({
        type: 'POST',
        url: '/create/getchild',
        data: {
            'course_id': $('#learn-page').attr('auth-course'),
            'parent_id': id.replace('p', ''),
            'lession_id': $('#learn-page').attr('auth-lession'),
        },
        success: function (result) {
            $(_target).parents('.danhgia1').find('.phanhoi').prepend(result);
            $(_target).parents('.danhgia1').find('.phanhoi').toggle();
        }
    });
}

function setCookie(name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}
;
function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

function readCookieObj(name) {
    var result = document.cookie.match(new RegExp(name + '=([^;]+)'));
    result && (result = JSON.parse(result[1]));
    return result;
}

function removeCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

//----------------------------------------------------------------------------------
autoplay = true;
//setCookie('autoplay', true);
$('body').on('click', '.btn-ap', function () {
    if ($(this).find('#autoplay').attr('class') === 'fa fa-toggle-off') {
        autoplay = true;
        $(this).find('#autoplay').removeClass('fa-toggle-off').addClass('fa-toggle-on');
        setCookie('autoplay', true);
    } else if ($(this).find('#autoplay').attr('class') === 'fa fa-toggle-on') {
        autoplay = false;
        $(this).find('#autoplay').removeClass('fa-toggle-on').addClass('fa-toggle-off');
        setCookie('autoplay', false);
    }
});
if (getCookie('autoplay') === 'true') {
    $('.btn-ap').find('#autoplay').removeClass('fa-toggle-off').addClass('fa-toggle-on');
    autoplay = true;
} else {
    $('.btn-ap').find('#autoplay').removeClass('fa-toggle-on').addClass('fa-toggle-off');
    autoplay = false;
}

var delay = (function () {
    var timer = 0;
    return function (callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };
})();

$('.danhsachdanhgia').on('keyup', $('.each_data_text'), function (e) {
    var code = e.keyCode ? e.keyCode : e.which;
    if (code == 13) {
        var obj = $(e.target);
        var message = obj.val();
        var id = obj.attr('id');
        if (message != '') {
            $.ajax({
                type: 'POST',
                url: '/course_action/update_discussion',
                data: {
                    'course_id': $('#learn-page').attr('auth-course'),
                    'parent_id': id.replace('d', ''),
                    'lession_id': $('#learn-page').attr('auth-lession'),
                    'message': message,
                },
                success: function (message) {
                    obj.val('').empty();
                    obj.parents('.phanhoi').prepend(message);
                }
            });
        } else {
            $("#discussion").focus();
        }
    }
});

$('#discussion_text').keyup(function (e) {
    var code = e.keyCode ? e.keyCode : e.which;
    if (code == 13) {
        var message = $(this).val();
        var id = $(this).attr('id');
        var obj = $(this);
        if (message != '') {
            delay(function () {
                $.ajax({
                    type: 'POST',
                    url: '/course_action/update_discussion',
                    data: {
                        'course_id': $('#learn-page').attr('auth-course'),
                        'parent_id': 0,
                        'lession_id': $('#learn-page').attr('auth-lession'),
                        'message': message,
                    },
                    beforeSend: function (xhr) {
                        $('.spinner').show();
                    },
                    complete: function (jqXHR, textStatus) {
                        $('.spinner').hide();
                    },
                    success: function (message) {
                        obj.val('').empty();
                        $('.danhsachdanhgia').prepend(message);
                    }
                });
            }, 1000);
        }
    }
});


$('.note_comment').keyup(function (e) {
    var code = e.keyCode ? e.keyCode : e.which;
    if (code == 13) {
        var message = $(this).val();
        var obj = $(this);
        if (message != '') {
            delay(function () {
                $.ajax({
                    type: 'POST',
                    url: '/create/savenote',
                    data: {
                        'course_id': $('#learn-page').attr('auth-course'),
                        'lession_id': $('#learn-page').attr('auth-lession'),
                        'message': message
                    },
                    beforeSend: function (xhr) {
                        $('.spinner').show();
                    },
                    complete: function (jqXHR, textStatus) {
                        $('.spinner').hide();
                    },
                    success: function (result) {
                        if (result.success) {
                            $('.each_note').prepend('<div class="edit_p_tag" auth-id-cm="' + result.data.ID + '"><p class="text_tag">' + result.data.Content + '</p></div><hr class="hr-height" />');
                            $(obj).val('');
                        }
                    }
                });
            }, 1000);
        }
    }
});

$('.note_data_get').click(function () {
    $.ajax({
        type: 'POST',
        url: '/create/getnote',
        data: {
            'course_id': $('#learn-page').attr('auth-course'),
            'lession_id': $('#learn-page').attr('auth-lession')
        },
        beforeSend: function (xhr) {
            $('.spinner').show();
        },
        complete: function (jqXHR, textStatus) {
            $('.spinner').hide();
        },
        success: function (result) {
            if ($('.edit_p_tag').length <= 0) {
                $.each(result.data, function () {
                    $('.each_note').append('<div class="edit_p_tag" auth-id-cm="' + this.ID + '"><p class="text_tag">' + this.Content + '</p></div><hr class="hr-height" />');
                });
            }

        }
    })
});

$(document).ready(function () {
    if ($('#learn-page').width() <= 420) {
        $('.mobile_text').text('');
    }
    var height = $('.player-rp').height();
    $('#myPlayerID').css('height', height);
});
$('body').on('click', 'p.text_tag', function () {
    var obj = $(this);
    var text = obj.text();
    var html = '<input type="text" class="input-edit-note"  value="' + text + '" style="width:100%" />';
    $(obj).parents('.edit_p_tag').html(html);
});
$('body').on('keyup', '.input-edit-note', function (e) {
    var obj = $(this);
    var code = e.keyCode ? e.keyCode : e.which;
    if (code == 13) {
        var message = $(this).val();
        var obj = $(this);
        if (message != '') {
            delay(function () {
                $.ajax({
                    type: 'POST',
                    url: '/create/editnote',
                    data: {
                        'message': message,
                        id: obj.parents('.edit_p_tag').attr('auth-id-cm')
                    },
                    beforeSend: function (xhr) {
                        $('.spinner').show();
                    },
                    complete: function (jqXHR, textStatus) {
                        $('.spinner').hide();
                    },
                    success: function (result) {
                        if (result.success) {
                            $(obj).parents('.edit_p_tag').html('<p class="text_tag">' + result.data.Content + '</p>');
                            obj.remove();
                        }
                    }
                });
            }, 1000);
        }
    }
});
$(document).ready(function () {
    setTimeout(function () {
        $('.adv_location').remove();
    }, 15 * 1000);
});

$('body').on('click', '.color-light', function () {
    $(this).parents('.adv_location').remove();
});

$('body').on('click', '.show_up_content_detail', function () {
    if ($(this).find('i').attr('class') == 'fa fa-chevron-up') {
        $(this).find('i').removeClass('fa-chevron-up').addClass('fa-chevron-down');
        $('.content_show_action').show();
    } else if ($(this).find('i').attr('class') == 'fa fa-chevron-down') {
        $(this).find('i').removeClass('fa-chevron-down').addClass('fa-chevron-up');
        $('.content_show_action').hide();
    }
});

function updateTimerPercent(percent, id, id_lession) {
    $.ajax({
        type: 'POST',
        url: '/create/percentandpass',
        data: {percent: percent, id: id, lession_id: id_lession},
        success: function (result) {
            if (result.success) {

            }
        }
    });
}

$('.note_comment_submit').click(function () {
    var message = $('.note_comment').val();
    var obj = $('.note_comment');
    if (message != '') {
        delay(function () {
            $.ajax({
                type: 'POST',
                url: '/create/savenote',
                data: {
                    'course_id': $('#learn-page').attr('auth-course'),
                    'lession_id': $('#learn-page').attr('auth-lession'),
                    'message': message
                },
                beforeSend: function (xhr) {
                    $('.spinner').show();
                },
                complete: function (jqXHR, textStatus) {
                    $('.spinner').hide();
                },
                success: function (result) {
                    if (result.success) {
                        $('.each_note').prepend('<div class="edit_p_tag" auth-id-cm="' + result.data.ID + '"><p class="text_tag">' + result.data.Content + '</p></div><hr class="hr-height" />');
                        $(obj).val('');
                    }
                }
            });
        }, 1000);
    }
});

function errorCall(courseId, lessionId) {
    popup.open('error-popup', 'Báo lỗi video', tmpl('/create_course/unc_template_error.tpl'), [{
        title: '<span><i class="fa fa-cog"></i> Thực hiện<span>',
        style: 'btn btn-success',
        fn: function () {
            var content = $('textarea[name=error_handle]').val();
            $.ajax({
                type: 'POST',
                url: '/create/errorcall',
                data: {course_id: courseId, lession_id: lessionId, content: content},
                beforeSend: function (xhr) {
                    $('#popup-cmd-error-popup-0 i').addClass('fa-spin');
                },
                complete: function (jqXHR, textStatus) {
                    $('#popup-cmd-error-popup-0 i').removeClass('fa-spin');
                },
                success: function (result) {
                    if (result.success) {
                        alert(result.message);
                        popup.close('error-popup');
                    }
                }
            });
        }
    }
    ]);
}

learn.submitQuestion = function () {
    var content = $('textarea[name=question_text]').val();
    var lesson_id = $('#mySidenav').attr('auth-lesson');
    var course_id = $('#mySidenav').attr('auth-course');

    $.ajax({
        type: 'POST',
        url: '/create/commentsave',
        data: {course_id: course_id, lession_id: lesson_id, content: content},
        beforeSend : function(){
            $('.btn-send-request').disable();
            $('.btn-send-request').addLoading();
        },
        success: function (result) {
            if (result.success) {
                $('.block_comment_root').prepend(result.data);
                $('textarea[name=question_text]').val('');
            }
        },
        complete : function () {
            $('.btn-send-request').unDisable();
            $('.btn-send-request').removeLoading();
        }
    });

};

learn.submitOverview = function (course_id) {
    var content = $('textarea[name=question_text]').val();
    if($.trim(content) != '' && content.length >= 10){
        $.ajax({
            type: 'POST',
            url: '/create/commentsave',
            data: {course_id: course_id, content: content},
            success: function (result) {
                if (result.success) {
                    $('.message').text('');
                    $('.block_comment_root').prepend(result.data);
                    $('textarea[name=question_text]').val('');
                }else {
                    $('.message').removeClass('text-success').addClass('text-danger').text('Hiện tại không thể bình luận!');
                }
            }
        });
    }else{
        $('.message').removeClass('text-success').addClass('text-danger').text('Bạn chưa nhập nội dung hoặc nội dung quá ngắn!');
    }
};

learn.getSubOverview = function (parent_id, course_id, lesson_id, obj) {
    $.ajax({
        type: 'POST',
        url: '/create/getchildcomment',
        data: {course_id: course_id, lession_id: lesson_id, parent_id: parent_id},
        success: function (result) {
            if (result.success) {
                if($(obj).parents('.uv-box-qa-an').find('.uv-box-an').length > 0){
                    $(obj).parents('.uv-box-qa-an').find('.uv-box-an').remove();
                    $(obj).parents('.uv-box-qa-an').find('.uv-box-txt').show();
                }
                $(obj).parents('.uv-box-qa-an').find('.main_sub_comment').prepend(result.data);
                $(obj).parents('.uv-box-qa-an').find('.block_sub_comment').show();
            }
        }
    });
};

learn.getSub = function (obj) {
    $(obj).parents('.uv-box-qa-an').find('.block_sub_comment').show();
    // var lesson_id = $('#mySidenav').attr('auth-lesson');
    // var course_id = $('#mySidenav').attr('auth-course');
    // var parent_id = $(obj).parents('.uv-box-qa-an').attr('auth-parent-id');
    //
    // $.ajax({
    //     type: 'POST',
    //     url: '/create/getchildcomment',
    //     data: {course_id: course_id, lession_id: lesson_id, parent_id: parent_id},
    //     success: function (result) {
    //         if (result.success) {
    //             if($(obj).parents('.uv-box-qa-an').find('.uv-box-an').length > 0){
    //                 $(obj).parents('.uv-box-qa-an').find('.uv-box-an').remove();
    //             }
    //             $(obj).parents('.uv-box-qa-an').find('.main_sub_comment').prepend(result.data);
    //             $(obj).parents('.uv-box-qa-an').find('.block_sub_comment').show();
    //         }
    //     }
    // });
};

learn.submitSub = function (obj) {
    var lesson_id = $('#mySidenav').attr('auth-lesson');
    var course_id = $('#mySidenav').attr('auth-course');
    var parent_id = $(obj).parents('.uv-box-qa-an').attr('auth-parent-id');
    var content = $(obj).parents('.uv-box-qa-an').find('input[name=subcomment_text]').val();

    $.ajax({
        type: 'POST',
        url: '/create/commentsave',
        data: {course_id: course_id, lession_id: lesson_id, content: content, parent_id: parent_id},
        success: function (result) {
            if (result.success) {
                $(obj).parents('.uv-box-qa-an').find('.main_sub_comment').prepend(result.data);
                $(obj).parents('.uv-box-qa-an').find('input[name=subcomment_text]').val('');
            }
        }
    });
};

learn.submitSub = function (obj) {
    if($('#mySidenav').length > 0){
        var lesson_id = $('#mySidenav').attr('auth-lesson');
        var course_id = $('#mySidenav').attr('auth-course');
        var parent_id = $(obj).parents('.uv-box-qa-an').attr('auth-parent-id');
        var content = $(obj).parents('.uv-box-qa-an').find('input[name=subcomment_text]').val();
    } else {
        var lesson_id = $(obj).parents('.data-overview').attr('auth-lesson');
        var course_id = $(obj).parents('.data-overview').attr('auth-course');
        var parent_id = $(obj).parents('.data-overview').attr('auth-parent-id');
        var content = $(obj).parents('.data-overview').find('input[name=subcomment_text]').val();
    }

    $.ajax({
        type: 'POST',
        url: '/create/commentsave',
        data: {course_id: course_id, lession_id: lesson_id, content: content, parent_id: parent_id},
        success: function (result) {
            if (result.success) {
                $(obj).parents('.uv-box-qa-an').find('.main_sub_comment').prepend(result.data);
                $(obj).parents('.uv-box-qa-an').find('input[name=subcomment_text]').val('');
            }
        }
    });
};


$(window).on("scroll", function() {
    var scrollHeight = $(document).height();
    var scrollPosition = $(window).height() + $(window).scrollTop();
    if ((scrollHeight - scrollPosition) / scrollHeight === 0) {
        // when scroll to bottom of the page
    }
});

/* $(document).ready(function () {
    var id = window.location.href.split("/");
	$("#learn-lesson-" + id['6']).find('i').css('color', 'green');
	console.log($("#learn-lesson-" + id['6']).offset().top);
    $('.u-video-list-course').animate({
		scrollTop: $("#learn-lesson-" + id['6']).offset().top - 1200
    }, 100);
}); */