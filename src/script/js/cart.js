requirejs.config(rq_config);
require(['jquery','cookie','cart__component'], function (jq,cookie) {
    !function(){
        //页头页脚加载
        $('.header').load('header.html .short__cut',function(){
            //修改登录状态

            if(!!$.cookie('name')){
                $('.bar__login span').html($.cookie('name'));
                $('.user__status').hide();
                $('.bar__login__link').hide();
                $('.bar__regist__link').hide();
                $('.user__logout').show();
                $('.user__info em').html($.cookie('name'));
            }else{
                $('.bar__login__user').hide();
                $('.bar__regist__link').show();
                $.cookie('strId',$.cookie('strId'),{expires:-1});
                $.cookie('strNum',$.cookie('strNum'),{expires:-1});
            }
            $('.user__exit').click(function(){
                $.cookie('name',$.cookie('name'),{expires:-1});
                location.reload();
            });
        });
        $('.footer').load('footer.html');

    }();
});