define(['jquery'], function () {
    //核心：中图/大图=小放/大放
    function Glass(obj) {
        this.box = $(obj.selector);
        this.config = $.extend({
            activeClass: 'selected',
            eType: 'mouseover'
        }, obj.config);

        this.baseImgUrl = '//img14.360buyimg.com/';
        //小图地址
        this.sImgUrl = this.baseImgUrl + 'n5/';
        //中图地址
        this.mImgUrl = this.baseImgUrl + 'n1/';
        //大图地址
        this.lImgUrl = this.baseImgUrl + 'n0/';

        //小图
        this.sPicLi = this.box.find('.slider__item');
        this.sPic = this.sPicLi.find('img');
        //中图
        this.spicDiv = this.box.find('.spic');
        this.mPic = this.spicDiv.find('img');
        //大图
        this.lPic = this.box.find('.bf img');
        //比例  大图/小图
        this.bili = this.lPic.width() / this.mPic.width();
        //大放大镜
        this.bf = this.box.find('.bf');
        //遮罩层
        this.mask = this.box.find('.sf');
        //小图轮播
        this.sliderBlock = this.box.find('.slider__list__block');
        this.itemWidth = this.sliderBlock.find('.slider__item').outerWidth(true);
        this.itemLen = this.sliderBlock.find('.slider__item').length;
        this.prev = this.box.find('.arrow-prev');
        this.next = this.box.find('.arrow-next');
        this.$num = 0;
        //初始化
        this.init();
    }

    Glass.prototype.init = function () {
        var _this = this;

        //小图事件
        this.sPicLi.on(this.config.eType, function () {
            _this.sFn(this);
        });
        //小图轮播
        this.sliderBlock.width(this.itemWidth * this.itemLen);
        this.prev.addClass('disabled');
        if (this.itemLen <= 5) {
            this.next.addClass('disabled');
        }
        this.prev.on('click', function () {
            _this.leftClick(this);
        });
        this.next.on('click', function () {
            _this.rightClick(this);
        });

        //放大镜效果
        this.spicDiv.on('mouseover', function (e) {
            _this.maskShow(e);
        });


        this.spicDiv.on('mousemove', function (e) {
            _this.maskMove(e);
        });

        this.spicDiv.on('mouseout', function (e) {
            _this.maskHide();
        });

    };

    //小图事件
    Glass.prototype.sFn = function (target) {
        var url = $(target).data('src');
        this.mPic.attr('src', this.mImgUrl + url);
        $(target).addClass(this.config.activeClass).siblings().removeClass(this.config.activeClass);
        this.bf.find('img').attr('src', this.lImgUrl + url);
    };

    Glass.prototype.leftClick = function (target) {
        if (!$(target).hasClass('disabled')) {
            var _this = this;
            this.$num--;
            this.sliderBlock.stop(true, true).animate({
                left: '-' + _this.$num * _this.itemWidth
            });
            this.next.removeClass('disabled');
            if (this.$num === 0) {
                this.prev.addClass('disabled');
            }
        }
    };

    Glass.prototype.rightClick = function (target) {
        if (!$(target).hasClass('disabled')) {
            var _this = this;
            //5
            this.$num++;
            this.sliderBlock.stop(true, true).animate({
                left: '-' + _this.$num * _this.itemWidth
            });
            if (this.$num === this.itemLen - 5) {
                this.next.addClass('disabled');
                this.prev.removeClass('disabled');
            }
        }

    };
    //放大镜效果
    Glass.prototype.maskShow = function (event) {

        this.mask.css({
            width: this.mPic.width() * this.bf.width() / this.lPic.width(),
            height: this.mPic.width() * this.bf.width() / this.lPic.width(),
            visibility: 'visible'
        });
        this.bf.css('visibility', 'visible');
    };
    Glass.prototype.maskHide = function () {
        //alert();
        this.mask.css('visibility', 'hidden');
        this.bf.css('visibility', 'hidden');
    };
    Glass.prototype.maskMove = function (event) {
        //因为都是正方形，宽=高
        var maskW = this.mask.width();
        var mPicW = this.mPic.width();
        //遮罩层位置
        var l = event.pageX - this.spicDiv.offset().left - (maskW / 2);
        var t = event.pageY - this.spicDiv.offset().top - (maskW / 2);
        if (l <= 0) {
            l = 0;
        } else if (l >= mPicW - maskW) {
            l = mPicW - maskW;
        }
        if (t <= 0) {
            t = 0;
        } else if (t >= mPicW - maskW) {
            t = mPicW - maskW;
        }
        this.mask.css({
            left: l,
            top: t
        });
        this.lPic.css({
            left: '-' + l * this.bili,
            top: '-' + t * this.bili
        });
    };

    return Glass;

});
