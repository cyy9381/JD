;(function ($) {
    /*
    *  tab切换，可以click切换，也可mouseover延迟切换
    *  delay:延迟时间
    * */

    $.fn.tab = function (option) {
        option = $.extend({
            activeClass: 'active',
            //tab
            tabClass: '.tab',
            //tab对应的div
            tabInner: '.tab-block',
            eType: 'click',
            delay: 300
        }, option);
        //这里的$(this)指的调用这个插件的对象
        var $me = $(this);
        var timer = null;
        $me.each(function () {
            if (option.eType === 'click') {
                $(option.tabClass, $me).on('click', function () {
                    $(option.tabInner, $me).eq($(option.tabClass, $me).index()).show().siblings().hide();
                });
            } else {
                $(option.tabClass, $me).on('mouseover', function () {
                    var _this = $(this);
                    var $index = _this.index();
                    timer = setTimeout(function () {
                        _this.addClass(option.activeClass).siblings().removeClass(option.activeClass);
                        $(option.tabInner, $me).eq($index).show().siblings().hide();
                    }, option.delay);
                });
                $(option.tabClass, $me).on('mouseout', function () {
                    clearTimeout(timer);
                });
            }
        });
    }

})(jQuery);