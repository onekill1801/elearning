var membership = {};
var onloadCallback = function () {
    grecaptcha.render('g-recaptcha', {
        'sitekey': '6LcCU20UAAAAAI7-Yv1xb1zA0Pbf4pWNT2rBbaxW',
        'callback': verifyCallback,
        'theme': ''
    });
};

var verifyCallback = function (response) {
    var csrfToken = $('meta[name="csrf-token"]').attr("content");
    $.ajax({
        url: "/membership/savecaptcha",
        data: {response: response, _csrf: csrfToken},
        type: "POST",
        dataType: 'json',
        success: function (result) {

        }
    });
};

$('.block-napthe').on('change', '#addcardform-key', function () {
    var str = $(this).val();
    if (str === null || str === '')
        return '';
    var rebuild = str.substring(0, 4) + '-' + str.substring(4, 8) + '-' + str.substring(8, 12) + '-' + str.substring(12, 16);
    $(this).val(rebuild);
});

$('#myModalMembership').on('change', 'select[name=searching_membership]', function () {
    $.ajax({
        url: "/membership/getcourse",
        data: {id: $(this).val()},
        type: "POST",
        dataType: 'json',
        success: function (result) {
            $('.content_course_membership').html(result.data);
        }
    });
});

$('#myModalMembershipMinutes').on('change', 'select[name=searching_membership]', function () {
    $.ajax({
        url: "/membership/getcourse",
        data: {id: $(this).val(), type: 1},
        type: "POST",
        dataType: 'json',
        success: function (result) {
            $('.content_course_membership').html(result.data);
        }
    });
});

$('#myModalMembership').on('click', '.active-course', function () {
    $.ajax({
        url: "/membership/courseactive",
        type: "POST",
        dataType: 'json',
        success: function (result) {
            if (result.success) {
                location.href = result.data;
                location.reload();
            } else {
                $('.error-active-membership').text(result.message);
                setTimeout(function () {
                    $('.error-active-membership').text('').hide();
                }, 4000);
            }
        }
    });
});


$(document).ready(function () {
    if (window.location.hash) {
        let hash = window.location.hash.replace('#', '');
        if (hash == 'membership' || hash == 'buyed') {
            $('.nav-tabs').find('li').removeClass('active');
            $('.' + hash).parent().addClass('active');
            $('.tab-pane').removeClass('active');
            $('#' + hash).addClass('active');
        }
    }
});

$('select[name=searching_membership]').selectpicker();

$('.clickMember').on('click',function(){
    var id = $(this).data('id');
   if(id){
     $.ajax({
        url:"/membership/membercourse",
        type: "POST",
        data:{id:id},
        success:function(res){
            if(res.data == null){
               $('#membership_modal').modal('show');
               $('.modal-body').text(res.message);
               var count = $('.count_course').data('count');
            }else if(res.data == 'error'){
                $('#membership_modal').modal('show');
               $('.modal-body').text(res.message);
            }else{
                $('.count_course').text(res.data);
                $('.btn_'+id).empty();
                var html = '<a href="/learn/'+id+'/overview" class="btn btn-danger active-course">Vào học ngay</a>';
                $('.btn_'+id).append(html);
                $(document).ready(function() {
                    toastr.options.timeOut = 3000;
                    toastr.success('Bạn đã kích hoạt khóa học thành công, còn '+res.data+' khóa!')
                });
            }

        }
   });
   
   }
});