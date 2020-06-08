$(document).ready(function () {

    // Nhắn tin từ giao diện người dùng
    $('.btn-send-message').on('click',function () {
        var $this = $(this);
        var textArea = $('#message-send');
        var content = textArea.val();
        if(content === '' || $.trim(content) === ''){
            alert('Nội dung tin nhắn không được để trống');
            return false;
        }
        $.ajax({
            url : '/dashboard/user/message',
            type : 'POST',
            data : {
                message : content,
                user_id : textArea.attr('data-id')
            },
            success : function (res) {
                $('.text-result-send-message').text(res.message);
            },
            beforeSend : function () {
                $this.disable();
                $this.addLoading();
            },
            complete : function () {
                $this.removeLoading();
                textArea.val('');
                setTimeout(function() {
                    $this.unDisable();
                }, 3000);
            }
        });
    });

    // Xem và gửi tin nhắn ở giao diện thông báo
    var renderMessages = function(creatorId){
        var layOut = $('#modalMessage .modal-content .modal-body');
        layOut.text('Loading ...');
        layOut.addLoading();
        $.ajax({
            url : '/dashboard/user/getmessage',
            type : 'POST',
            data : {
                creator_id : creatorId
            },
            success : function (res) {
                layOut.html(res.data);
                layOut.animate({ scrollTop: layOut.prop("scrollHeight")}, 1000);
            },
            complete : function () {
                layOut.text();
                layOut.removeLoading();
            }
        });
    };

    $('.btn-view-message').on('click',function () {
        var $this = $(this);
        var creator = $this.attr('data-creator');
        var inputConversation = $('.input-text-conversation');
        inputConversation.attr('data-user-id',creator);
        var fullnameCreator = $this.attr('data-fullname-creator');
        $('#modalMessage .modal-content .modal-header .modal-title .fullname-creator').text(fullnameCreator);
        renderMessages(creator);
    });

    $('.btn-send-conversation').on('click',function () {
        var layOut = $('#modalMessage .modal-content .modal-body');
        var $this = $(this);
        var input = $('.input-text-conversation');
        var userId = input.attr('data-user-id');
        var message = input.val();
        $('.error-message').addClass('hidden');
        if(message === '' || $.trim(message) === ''){
            $('.error-message').removeClass('hidden');
            return false;
        }
        $.ajax({
            url : '/dashboard/user/sendmessageconversation',
            type : 'POST',
            data : {
                message : message,
                user_id : userId
            },
            success : function (res) {
                layOut.append(res.data);
                input.val('');
                layOut.animate({ scrollTop: layOut.prop("scrollHeight")}, 1000);
            },
            beforeSend : function () {
                $this.disable();
                $this.addLoading();
            },
            complete : function () {
                $this.removeLoading();
                $this.unDisable();
            }
        });
    });

    $('.input-text-conversation').on('keyup',function (e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code==13) {
            $('.btn-send-conversation').click();
        }
    });

    //Xóa người dùng khỏi nhóm
    var deleteUserGroup = function (userId) {
        if(confirm('Bạn có chắc chắn muốn xóa người dùng này khỏi nhóm?') == true){
            alert('co');return;
        }
        alert('ko');
    };
    $('.delete-user-group').on('click',function () {
        var $this = $(this);
        var userId = $this.attr('data-user-id');
        var groupId = $this.attr('data-group-id');
        if(confirm('Bạn có chắc chắn muốn xóa người dùng này khỏi nhóm?') == true){
            $.ajax({
                url : '/groupmember/delete',
                type : 'POST',
                data : {
                    group_id : groupId,
                    user_id : userId
                },
                success : function (res) {
                    console.log(res);
                    if(res.success){
                        $('.userGroup-'+userId).remove();
                    }
                    alert(res.message);
                }
            });
        }
    });

    //Tìm kiếm người dùng cho group
    var xhrSearch = null;
    $('.input-user-search-group').on('keyup',function () {
        var input = $(this);
        var text = input.val();
        if(xhrSearch != null){
            xhrSearch.abort();
        }
        xhrSearch = $.ajax({
            url : '/groups/search-user',
            type : 'POST',
            data : {
                email : text
            },
            success : function (res) {
                $('.list-user-search-group').removeClass('hidden');
                $('.list-user-search-group').html(res.data);
            }
        });
    });
    $('.u-group-box-user-list').on('click','.item-search-email',function () {
        var $this = $(this);
        var userId = $this.attr('data-user-id');
        var input  = $('.input-user-search-group');
        input.val($this.text());
        input.attr('data-user-id',userId);
        $('.list-user-search-group').addClass('hidden');
    });
    $('.button-add-user-group').on('click',function () {
        var input  = $('.input-user-search-group');
        var userId = input.attr('data-user-id');
        var groupId = input.attr('data-group-id');
        if(userId === ''){
            alert('Bạn chưa chọn người dùng nào');
            return false;
        }
        $.ajax({
            url : '/groups/add-user',
            type : 'POST',
            data : {
                user_id : userId,
                group_id : groupId
            },
            success : function (res) {
                alert(res.message);
                window.location.reload();
            }
        });
    });

    // Tìm khóa học cho group
    $('select[name="course_id[]"]').on('change',function () {
        var $this = $(this);
        $.ajax({
            url : '/groups/select-course',
            type : 'POST',
            data : {
                course_ids : $this.val()
            },
            success : function (res) {
                $('.result-courses-select').html(res.data);
            }
        });
    });
    $('.btn-confirm-add-course-group').on('click',function () {
        var $this = $(this);
        var select = $('select[name="course_id[]"]');
        var groupId = $this.attr('data-group-id');
        var courseIds = select.val();
        if(courseIds.length === 0){
            alert('Bạn chưa chọn khóa học');
            return false;
        }
        $.ajax({
            url : '/groups/add-course',
            type : 'POST',
            data : {
                group_id : groupId,
                course_ids : courseIds
            },
            success : function (res) {
                alert(res.message);
                window.location.reload();
            },
            beforeSend : function () {
                $this.disable();
                $this.addLoading();
            },
            complete : function () {
                $this.removeLoading();
            }
        });
    });
    $('.btn-delete-course-group').on('click',function () {
        var $this = $(this);
        var groupId = $this.attr('data-group-id');
        var courseId = $this.attr('data-course-id');
        if(confirm('Bạn chắc chắn muốn xóa course này khỏi group?') == true){
            $.ajax({
                url : '/groups/delete-course',
                type : 'POST',
                data : {
                    group_id : groupId,
                    course_id : courseId
                },
                success : function (res) {
                    $('.course-'+courseId+'-group-'+groupId).remove();
                },
                beforeSend : function () {
                    $this.disable();
                    $this.addLoading();
                },
                complete : function () {
                    $this.removeLoading();
                }
            });
        }

    });
});