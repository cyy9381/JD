requirejs.config(rq_config);
require(['jquery', 'glass', 'cookie','common','cart__component'], function ($, Glass,cookie,common,cart__component) {

    //页头页脚加载
    $('.header').load('header.html .short__cut',function () {
        //修改登录状态
        if(!!$.cookie('name') && $.cookie('name')!='null'){
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

    //获取sid
    var productId = location.search.substring(1).split('=')[1];

    //图片基础路径
    var baseImgUrl = '//img14.360buyimg.com/';
    //小图地址
    var sImgUrl = baseImgUrl + 'n5/';
    //中图地址
    var mImgUrl = baseImgUrl + 'n1/';
    //大图地址
    var lImgUrl = baseImgUrl + 'n0/';
    $.ajax({
        url: 'http://127.0.0.1/JD/php/details.php?sid=' + productId + '',
        type: 'get',
        dataType: 'json'
    }).done(function (data) {
        //左边放大镜渲染
        var urlsArr = data.urls.split(',');
        var str1 = '', str2 = '';
        str1 = '<div class="spic">' +
            '<img src="' + mImgUrl + urlsArr[0] + '">' +
            '<div class="sf"></div>' +
            '</div>' +
            '<div class="bf">' +
            '<img src="' + lImgUrl + urlsArr[0] + '" alt="" class="bpic">' +
            '</div>';
        $('.scale').html(str1);

        $.each(urlsArr, function (index, value) {
            str2 += '<li class="slider__item pull-left" data-src="' + value + '">' +
                '<img alt="' + data.title + '" src="' + sImgUrl + value + '"   width="50" height="50">' +
                '</li>';
        });
        $('.details__slider ul').html(str2);
        $('.details__slider li').eq(0).addClass('selected');
        //放大镜
        var glass = new Glass({
            selector: '#glassBox'
        });

        //右边商品详情渲染
        $('.sku__name').html(data.title);
        $('.sku__price .price i').html(data.price);
    });

});