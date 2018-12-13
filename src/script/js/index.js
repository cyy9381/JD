requirejs.config(rq_config);
require(['jquery', 'lazyload', 'index_load', 'carousel', 'tab', 'common', 'cart__component'], function (jq, lazyload, Load, Carousel, tab, common) {

    //flash banner
    $('.flash__banner').load('flash_banner.html', function () {

        //top banner 广告
        $('.top__banner .js-close').on('click', function () {
            $('.top__banner').hide();
        });

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

        //头部搜索框
        $('#searchKey').on('input', function () {
            if ($.trim($(this).val()) === '') {
                $('#shelper').hide().html('');
            } else {
                common.searchInput($(this).val());
            }
        });
        $('#searchKey').on('focus', function () {
            $(this).val() !== '' && common.searchInput($(this).val());
        });
        $('#searchKey').on('blur', function () {
            $('#shelper').hide().html('');
        });
        $(window).on('scroll', function () {
            var $top = $(window).scrollTop();
            if ($top >= 500) {
                $('#search').addClass('search__fixed');
                $('.search__fixed').animate({
                    top:0
                },500);
            } else {
                   $('#search').removeClass('search__fixed');
            }
        });

        //轮播
        new Carousel({
            selector: ".flash__sale__block",
            config: {
                isOpacity: true
            }
        });

        $('.menu__list li').hover(function () {
            $(this).addClass('show-nav');
        }, function () {
            $(this).removeClass('show-nav');
        });

        //首页新聞
        $('.news__tab__tit').on('mouseover',function(){
            var index = $(this).index();
            $('.news__tab--active').stop(true).animate({
                left:$(this).index() * 60
            },300,'swing',function(){
                $('.news__cont__details').eq(index).show().siblings().hide();
            });

        });
    });

    //楼层
    $('.floors').load('floors.html', function () {

        //倒计时
        common.countDown();

        //各种轮播
        new Carousel({
            selector: ".sk__list__block",
            config: {
                time: 3000,
                isAutoMove: false
            }
        });

        new Carousel({
            selector: '.top__slider__block',
            config: {
                itemWidth: 350
            }
        });
        $('.tabs').tab({eType: 'mouseover', delay: 0});

        new Carousel({
            selector: '.daily__slider__block',
            config: {
                itemWidth: 350
            }
        });

        new Carousel({
            selector: '.explore__slider__list',
            config: {
                itemWidth: 350,
                time: 2500
            }
        });

        new Carousel({
            selector: '.coupons__slider__block',
            config: {
                itemWidth: 350
            }
        });

        new Carousel({
            selector: '.sk__chn__block',
            config: {
                itemWidth: 180
            }
        });

        new Carousel({
            selector: '.special__inner',
            config: {
                itemWidth: 1190
            }
        });

        //ajax请求 楼层数据
        common.getFloors();

        //ajax请求 “还没逛够” 数据
        $.ajax({
            url: 'http://127.0.0.1/JD/php/productList.php',
            type: 'get',
            dataType: 'json',
            success: function (data) {
                var strHtml = '';
                $.each(data, function (index, value) {
                    strHtml += '<li class="more__item more__item__good">' +
                        '<a class="more__lk" href="http://127.0.0.1/JD/src/details.html?sid=' + value.sid + '" target="_blank" title=' + value.title + '>' +
                        '<div class="more__img">' +
                        '<img class="lazy" data-original="//img14.360buyimg.com/n1/' + value.urls.split(',')[0] + '" alt=' + value.title + '>' +
                        '</div>' +
                        '<div class="more__info">' +
                        '<p class="more__info__name">' + value.title + '</p>' +
                        '<div class="more__info__price">' +
                        '<div class="mod__price"><i>¥</i><span class="more__info__price__txt">' + value.price + '</span></div>' +
                        '</div>' +
                        '</div>' +
                        '</a>' +
                        '</li>';
                });
                $('.more__list').append(strHtml);
                $("img.lazy").lazyload({
                    effect: "fadeIn"
                });
            }
        });
    });

});