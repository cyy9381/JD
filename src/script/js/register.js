requirejs.config(rq_config);
require(['jquery','validate'], function (jq,validate) {

    $(function(){
        $('#register').validate({
            rules:{
                username:{
                    required:true,
                    minlength:2,
                    maxlength:20,
                    remote:{
                        type:'post',
                        url:'http://127.0.0.1/JD/php/reg.php'
                    }
                },
                password:{
                    required:true,
                    minlength:6
                },
                repass:{
                    required:true,
                    equalTo:'#password'
                }
            },
            messages:{
                username:{
                    required:'<em class="err">用户名不能为空</em>',
                    minlength:'用户名不能小于2',
                    maxlength:'用户名不能大于10',
                    remote:'<em class="err">用户名已存在</em>'
                },
                password:{
                    required:'密码不能为空',
                    minlength:'密码不能小于6位'
                },
                repass:{
                    required:'密码重复不能为空',
                    equalTo:'两次密码输入不一致'
                }
            }

        });
    });

});