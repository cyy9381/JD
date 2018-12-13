requirejs.config(rq_config);
require(['jquery','cookie'], function (jq,cookie) {
    !function(){
        $('.js-submit').on('click',function(){
            var username = $('#username').val();
            var password = $('#password').val();

            $('.form__inp').focus(function(){
                $(this).parent().removeClass('item-error');
            });
            if(username==='' && password===''){
                $('.form__group').addClass('item-error');
                $('.msg-error').show().find('.error-tip').html('请输入账户名和密码');
                return;
            }
            if(username==='' && password!==''){
                $('.form__group').removeClass('item-error');
                $('#username').parent().addClass('item-error');
                $('.msg-error').show().find('.error-tip').html('请输入用户名');
                return;
            }
            if(username!=='' && password===''){
                $('.form__group').removeClass('item-error');
                $('#password').parent().addClass('item-error');
                $('.msg-error').show().find('.error-tip').html('请输入密码');
                return;
            }

            $.ajax({
                url:'http://127.0.0.1/JD/php/login.php',
                data:{
                    username:username,
                    password:password
                },
                type:'post',
                success:function(data){
                    if(data){
                        location.href = 'http://127.0.0.1/JD/src/index.html';
                        $.cookie('name',$('#username').val(),{expires:10});
                    }else{
                        $('.form__group').addClass('item-error');
                        $('.msg-error').show().find('.error-tip').html('账户名与密码不匹配，请重新输入');
                    }
                }
            });
        });
    }();
});