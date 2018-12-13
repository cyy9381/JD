define(['jquery'], function () {


    //随机数
    function rannum(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

    //倒计时--模拟随机未来时间
    function countDown() {
        var feture = new Date();
        feture.setHours(feture.getHours() + rannum(0, 60));
        feture.setMinutes(feture.getMinutes() + rannum(0, 60));
        feture.setSeconds(feture.getSeconds() + rannum(0, 60));
        var timer = setInterval(function () {
            var now = new Date();
            var time = parseInt((feture - now) / 1000);
            if (time == 0) {
                clearInterval(timer);
            }
            //时  分  秒
            var hour = parseInt(time % 86400 / 3600);
            var min = parseInt(time % 3600 / 60);
            var sec = time % 60;
            $('.cd_hour .cd_item_txt').html(hour < 10 ? '0' + hour : hour);
            $('.cd_minute .cd_item_txt').html(min < 10 ? '0' + min : min);
            $('.cd_second .cd_item_txt').html(sec < 10 ? '0' + sec : sec);
        }, 1000);
    }

    //返回到顶部
    function backToTop() {
        $('.js-back-to-top').on('click', function () {
            $('body,html').animate({
                scrollTop: 0
            }, 300);
        });
    }

    //toolbar
    function tooltarHover() {
        var toolTimer = null;
        $('.js-toolbar').hover(function (e) {
            var $this = $(this);
            toolTimer = setTimeout(function () {
                $this.find('.toolbar__tab').addClass('toolbar__tab--hover');
                $this.find('.tab-text').stop(true, true).animate({
                    left: -48
                }, 150);
            }, 200);
        }, function () {
            clearTimeout(toolTimer);
            $(this).find('.toolbar__tab').removeClass('toolbar__tab--hover');
            $(this).find('.tab-text').stop(true, true).animate({
                left: 35
            }, 200);
        });
    }

    //头部搜索框，使用淘宝官网跨域请求获取数据
    function searchInput(text) {
        $.ajax({
            url: 'https://suggest.taobao.com/sug?code=utf-8&q=' + text,
            type: 'get',
            dataType: 'jsonp',
            success: function (data) {
                var str = '';
                if (data.result.length !== 0) {
                    $.each(data.result, function (index, value) {
                        str += '<li>' +
                            '<span class="search-item">' + value[0] + '</span>' +
                            '<em class="search-count">约' + value[1] + '个商品</em>' +
                            '</li>'
                    });
                    str += '<li class="close">关闭</li>';
                    $('#shelper').show().html(str);
                } else {
                    $('#shelper').hide().html('');
                }
            }
        });
        $('#shelper').on('click', '.close', function () {
            $('#shelper').hide().html('');
        });
    }

    //返回到顶部
    backToTop();

    //右侧工具栏tooltar
    tooltarHover();

    //打开工具栏里中的购物车
    $('.js-toolbar-cart').on('click', function () {
        if ($('.toolbar__h').css('right') == '270px') {
            $('.toolbar__h').animate({
                right: 0
            }, 300);
        } else {
            $('.toolbar__h').animate({
                right: 270
            }, 300);
        }

    });
    //关闭工具栏里中的购物车
    $('#toobarCart').on('click', '.close', function () {
        $('.toolbar__h').animate({
            right: 0
        }, 300);
    });

    //首页请求楼层
    function getFloors() {
        $.ajax({
            url: 'http://127.0.0.1/JD/php/goods.php',
            type: 'get',
            dataType: 'json',
            success: function (data) {
                console.log(data);
                $.each(data, function (index, value) {
                    $.ajax({
                        url: 'http://127.0.0.1/JD/php/goodsList.php',
                        type: 'get',
                        data: {
                            header: value.header
                        },
                        dataType: 'json',
                        success: function (data) {
                            console.log(data);
                            var str = '<div class="stage">' +
                                '<div class="floorhd">' +
                                '<div class="center">' +
                                '<h3 class="floorhd__tit">' + value.header + '</h3>' +
                                '</div>' +
                                '</div>' +
                                '<div class="chn">' +
                                '<div class="center">' +
                                '<div class="chn__list">';
                            $.each(data, function (index, value) {
                                if (value.type === 'sort_1') {
                                    str += '<div class="chn__item box sort">' +
                                        '                    <h2 class="box-hd">' +
                                        '                        <a class="box-hd__lk" href="javascript:void(0);" target="_blank">' +
                                        '                            <h3 class="box-hd__tit">' + value.title1 + '</h3>' +
                                        '                            <i class="box_hd_arrow"></i>' +
                                        '                            <span class="box-hd__subtit">' + value.title1 + '</span>' +
                                        '                        </a>' +
                                        '                    </h2>' +
                                        '                    <div class="chn__item__inner">' +
                                        '                        <div class="chn__item__cont">' +
                                        '                            <a class="sort__large" href="javascript:void(0);" target="_blank" title="">' +
                                        '                                <div class="sort__large__img">' +
                                        '                                    <img class="lazy" data-original="' + value.imgUrls.split(',')[0] + '">' +
                                        '                                </div>' +
                                        '                            </a>' +
                                        '                            <a class="sort__middle" href="javascript:void(0);" target="_blank" title="">' +
                                        '                                <div class="sort__middle__img">' +
                                        '                                     <img class="lazy" data-original="' + value.imgUrls.split(',')[1] + '">' +
                                        '                                </div>' +
                                        '                            </a>' +
                                        '                            <a class="sort__middle" href="javascript:void(0);" target="_blank" title="">' +
                                        '                                <div class="sort__middle__img">' +
                                        '                                     <img class="lazy" data-original="' + value.imgUrls.split(',')[2] + '">' +
                                        '                                </div>' +
                                        '                            </a>' +
                                        '                        </div>' +
                                        '                    </div>' +
                                        '                </div>';
                                }
                                if (value.type === 'sort_2') {
                                    str += '<div class="chn__item box sort">' +
                                        '                    <h2 class="box-hd">' +
                                        '                        <a class="box-hd__lk" href="javascript:void(0);" target="_blank">' +
                                        '                            <h3 class="box-hd__tit">' + value.title1 + '</h3>' +
                                        '                            <i class="box_hd_arrow"></i>' +
                                        '                            <span class="box-hd__subtit">' + value.title1 + '</span>' +
                                        '                        </a>' +
                                        '                    </h2>' +
                                        '                    <div class="chn__item__inner">' +
                                        '                        <div class="chn__item__cont">' +
                                        '                            <a class="sort__large" href="javascript:void(0);" target="_blank" title="">' +
                                        '                                <div class="sort__large__img">' +
                                        '                                    <img class="lazy" data-original="' + value.imgUrls.split(',')[0] + '">' +
                                        '                                </div>' +
                                        '                            </a>' +
                                        '                            <a class="sort__large" href="javascript:void(0);" target="_blank"' +
                                        '                               title="">' +
                                        '                                <div class="sort__large__img">' +
                                        '                                    <img class="lazy" data-original="' + value.imgUrls.split(',')[1] + '">' +
                                        '                                </div>' +
                                        '                            </a>' +
                                        '                        </div>' +
                                        '                    </div>' +
                                        '                </div>';
                                }
                                if (value.type === 'act') {
                                    str += '<div class="chn__item box act">' +
                                        '                    <div class="chn__item__inner act__inner">' +
                                        '                        <a class="act__lk" href="javascript:void(0);" target="_blank" title="">' +
                                        '                            <div class="act__img">' +
                                        '                                <img class="lazy" data-original="' + value.imgUrls + '">' +
                                        '                            </div>' +
                                        '                        </a>' +
                                        '                    </div>' +
                                        '                </div>';
                                }
                                if (value.type === 'shop') {
                                    str += '<div class="chn__item box shop">' +
                                        '                    <div class="shop_wrapper">' +
                                        '                        <a class="shop_info" href="javascript:void(0);" target="_blank">' +
                                        '                            <div class="shop_logo">' +
                                        '                                <img class="lazy" data-original="' + value.title1 + '">' +
                                        '                            </div>' +
                                        '                            <div class="shop_name"><span class="shop_name_txt">'+ value.title2 +'</span></div>' +
                                        '                        </a>' +
                                        '                        <div class="shop_middle">' +
                                        '                            <a href="javascript:void(0);" target="_blank" class="shop_middle_lk" title="">' +
                                        '                                <div class="shop_middle_img">' +
                                        '                                    <img class="lazy" data-original="' + value.imgUrls.split(',')[0] + '">' +
                                        '                                </div>' +
                                        '                            </a>' +
                                        '                        </div>' +
                                        '                        <div class="shop_small clearfix">' +
                                        '                            <a class="shop_small_item" href="javascript:void(0);" target="_blank" title="">' +
                                        '                                <div class="shop_small_img">' +
                                        '                                    <img class="lazy" data-original="' + value.imgUrls.split(',')[1] + '">' +
                                        '                                </div>' +
                                        '                            </a>' +
                                        '                            <a class="shop_small_item" href="javascript:void(0);" target="_blank" title="">' +
                                        '                                <div class="shop_small_img">' +
                                        '                                    <img class="lazy" data-original="' + value.imgUrls.split(',')[2] + '">' +
                                        '                                </div>' +
                                        '                            </a>' +
                                        '                            <a class="shop_small_item" href="javascript:void(0);" target="_blank" >' +
                                        '                                <div class="shop_small_img">' +
                                        '                                    <img class="lazy" data-original="' + value.imgUrls.split(',')[3] + '">' +
                                        '                                </div>' +
                                        '                            </a>' +
                                        '                        </div>' +
                                        '                    </div>' +
                                        '                </div>';
                                }
                                if (value.type === 'act__multi') {
                                    str += '<div class="chn__item box act act__multi">' +
                                        '                    <div class="chn__item__inner act__inner">' +
                                        '                        <a class="act__lk"' +
                                        '                           href="javascript:void(0);"' +
                                        '                           target="_blank">' +
                                        '                            <div class="act__img">' +
                                        '                                <img class="lazy" data-original="' + value.imgUrls.split(',')[0] + '">' +
                                        '                            </div>' +
                                        '                        </a>' +
                                        '                        <a class="act__lk"' +
                                        '                           href="javascript:void(0);"' +
                                        '                           target="_blank">' +
                                        '                            <div class="act__img">' +
                                        '                                <img class="lazy" data-original="' + value.imgUrls.split(',')[1] + '">' +
                                        '                            </div>' +
                                        '                        </a>' +
                                        '                    </div>' +
                                        '                </div>';
                                }
                                if (value.type === 'treasure') {
                                    str += '<div class="chn__item box treasure">' +
                                        '                    <a class="treasure__scene" href="javascript:void(0);" target="_blank" title="">' +
                                        '                        <div class="treasure__scene__hd">' +
                                        '                            <h4 class="treasure__scene__tit">' + value.title1.split(',')[0] + ' · <span class="treasure__scene__subtit">' + value.title1.split(',')[1] + '</span>' +
                                        '                            </h4>' +
                                        '                        </div>' +
                                        '                        <div class="treasure__scene__bd">' +
                                        '                            <ul class="treasure__list">' +
                                        '                                <li class="treasure__item">' +
                                        '                                    <div class="treasure__img">' +
                                        '                                        <img class="lazy" data-original="' + value.imgUrls.split(',')[0] + '">' +
                                        '                                    </div>' +
                                        '                                </li>' +
                                        '                                <li class="treasure__item">' +
                                        '                                    <div class="treasure__img">' +
                                        '                                        <img class="lazy" data-original="' + value.imgUrls.split(',')[1] + '">' +
                                        '                                    </div>' +
                                        '                                </li>' +
                                        '                            </ul>' +
                                        '                        </div>' +
                                        '                        <div class="treasure__scene__gap"></div>' +
                                        '                    </a>' +
                                        '                    <a class="treasure__scene" href="javascript:void(0);" target="_blank" title="">' +
                                        '                        <div class="treasure__scene__hd">' +
                                        '                            <h4 class="treasure__scene__tit">' + value.title2.split(',')[0] + ' · <span class="treasure__scene__subtit">' + value.title2.split(',')[1] + '</span>' +
                                        '                            </h4>' +
                                        '                        </div>' +
                                        '                        <div class="treasure__scene__bd">' +
                                        '                            <ul class="treasure__list">' +
                                        '                                <li class="treasure__item">' +
                                        '                                    <div class="treasure__img">' +
                                        '                                        <img class="lazy" data-original="' + value.imgUrls.split(',')[2] + '">' +
                                        '                                    </div>' +
                                        '                                </li>' +
                                        '                                <li class="treasure__item">' +
                                        '                                    <div class="treasure__img">' +
                                        '                                        <img class="lazy" data-original="' + value.imgUrls.split(',')[3] + '">' +
                                        '                                    </div>' +
                                        '                                </li>' +
                                        '                            </ul>' +
                                        '                        </div>' +
                                        '                        <div class="treasure__scene__gap"></div>' +
                                        '                    </a>' +
                                        '                </div>';
                                }
                            });
                            str += '</div>' +
                                '</div>' +
                                '</div>' +
                                '</div>';
                            $('.scene').before(str);
                            $("img.lazy").lazyload({
                                effect: "fadeIn"
                            });
                        }
                    });
                });
            }
        });
    }

    return {
        countDown: countDown,
        backToTop: backToTop,
        tooltarHover: tooltarHover,
        searchInput: searchInput,
        getFloors: getFloors
    }

});