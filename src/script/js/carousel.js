define(['jquery'], function () {

        function Carousel(obj) {
            this.box = $(obj.selector);
            this.config = $.extend({
                //是否是透明度改变
                isOpacity: false,
                //每次滑动的(图片)个数
                itemsPerMove: 1,
                //item width
                itemWidth: 800,
                //动画持续时间
                duration: 500,
                current: 0,
                time: 2000,
                //是否自动轮播
                isAutoMove:true,
            }, obj.config);
            this.itemLen = this.box.find('.item').length;
            this.left = this.box.parents('.slider').find('.slider_control_prev');
            this.right = this.box.parents('.slider').find('.slider_control_next');
            this.distance = this.config.itemsPerMove * this.config.itemWidth;
            this.thumb = this.box.parents('.slider').find('.slides__thumb i');
            this.opacityIndex = 0;
            this.stop = false;
            //初始化
            this.config.isOpacity ? this.opacityInit() : this.init();
        }

        //透明度初始化方法
        Carousel.prototype.opacityInit = function () {
            var _this = this;
            _this.opacitySwitch();
            this.left.on('click', function () {
                if (!_this.stop) {
                    _this.stop = true;
                    _this.opacityIndex--;
                    if (_this.opacityIndex < 0) {
                        _this.opacityIndex = _this.itemLen - 1;
                    }
                    _this.opacitySwitch();
                }

            });

            this.right.on('click', function () {
                if (!_this.stop) {
                    _this.stop = true;
                    _this.opacityIndex++;
                    if (_this.opacityIndex > _this.itemLen - 1) {
                        _this.opacityIndex = 0;
                    }
                    _this.opacitySwitch();
                }
            });

            this.box.timer = setInterval(function () {
                _this.right.click();
            }, _this.config.time);
            this.box.parents('.slider').hover(function () {
                clearInterval(_this.box.timer);
            }, function () {
                _this.box.timer = setInterval(function () {
                    _this.right.click();
                }, _this.config.time);
            });

            this.thumb.hover(function () {
                _this.opacityIndex = $(this).index();
                _this.opacitySwitch();
            }, function () {
            });
        };

        //透明度切换
        Carousel.prototype.opacitySwitch = function () {
            var _this = this;
            this.thumb.length > 0 && this.thumb.eq(this.opacityIndex).addClass('slides__thumb--active').siblings().removeClass('slides__thumb--active');
            this.box.find('.item').eq(this.opacityIndex).animate({
                opacity: 1
            }, this.config.duration, 'swing')
                .siblings('.item').animate({
                opacity: 0
            }, this.config.duration, 'swing', function () {
                _this.stop = false;
            })
        };

        //轮播初始化方法
        Carousel.prototype.init = function () {
            var firstHtml = this.box.find('.item').first().clone();
            var lastHtml = this.box.find('.item').last().clone();
            this.box.append(firstHtml);
            this.box.prepend(lastHtml);
            this.box.width(this.config.itemWidth * this.box.find('.item').length);
            this.box.css('left', '-' + this.config.itemWidth + 'px');
            var _this = this;
            this.thumb.length > 0 && this.thumb.eq(this.config.current).addClass('slides__thumb--active').siblings().removeClass('slides__thumb--active');

            //点击向左按钮
            this.left.on('click', function () {
                if (!_this.stop) {
                    _this.stop = true;
                    _this.moveTo('left');
                }

            });
            //点击向右按钮
            this.right.on('click', function () {
                if (!_this.stop) {
                    _this.stop = true;
                    _this.moveTo('right');
                }
            });

            //自动轮播
            this.config.isAutoMove && (this.box.timer = setInterval(function () {
                _this.right.click();
            }, _this.config.time));

            //鼠标移入slider停止自动轮播，移除继续自动轮播
            this.box.parents('.slider').hover(function () {
                clearInterval(_this.box.timer);
            }, function () {
                _this.box.timer = setInterval(function () {
                    _this.right.click();
                }, _this.config.time);
            });

            //鼠标hover到下面的小圆点事件
            this.thumb.hover(function () {
                clearInterval(_this.box.timer);
                _this.config.current = $(this).index();
                _this.thumb.length > 0 && $(this).addClass('slides__thumb--active').siblings().removeClass('slides__thumb--active');
                _this.box.stop(true).animate({
                    left: '-' + (_this.config.itemWidth * ($(this).index() + 1)) + 'px'
                }, _this.config.duration, 'swing', function () {
                    _this.stop = false;
                });
            }, function () {
                _this.right.click();
            });

        };

        //轮播滚动
        Carousel.prototype.moveTo = function (direction) {
            var _this = this;
            if (direction === 'left') {
                this.config.current--;
                if (this.config.current < 0) {
                    this.config.current = this.itemLen - 1;
                    this.box.css('left', '-' + (this.config.itemWidth * (this.itemLen + 1)) + 'px');
                }
                this.box.animate({
                    left: '+=' + this.distance
                }, this.config.duration, 'swing', function () {
                    _this.stop = false;
                });
            } else {
                this.config.current++;
                if (this.config.current > this.itemLen - 1) {
                    this.config.current = 0;
                    this.box.css('left', 0);
                }
                this.box.animate({
                    left: '-=' + this.distance
                }, this.config.duration, 'swing', function () {
                    _this.stop = false;

                });
            }
            this.thumb.length > 0 && this.thumb.eq(this.config.current).addClass('slides__thumb--active').siblings().removeClass('slides__thumb--active');

        };

        return Carousel;

    });
