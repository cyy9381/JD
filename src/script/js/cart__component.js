define(['jquery', 'cookie'], function () {

    /*
    *
    *
    * 只有第一次进入详情页时，如果有历史添加商品cookie，则请求php获取数据其余情况都不再请求
    * 只有第一次进入购物车时，才会请求php获取数据，其余情况都不再请求
    *
    * */

    //获取sid
    var productId = location.search.substring(1).split('=')[1];

    //图片基础路径
    var baseImgUrl = '//img14.360buyimg.com/';
    //小图地址
    var mImgUrl = baseImgUrl + 'n1/';
    var $buyNum = null, //商品购买数量input
        $Max = 99, //商品一次最多添加99件
        $cartBtn = $('#InitCartUrl'),//加入购物车按钮
        $shoppingAmount = $('#shoppingAmount'), //头部购物车总数量
        $cartPop = $('.cart_pop'), //购物车为空的div
        $settleupContent = $('#settleup-content'), //购物车有商品的div
        $chooseAmount = $('.choose-amount'),
        $cart = $('.cart'),
        amountSum = 0, //amountSum：总数量
        amountPrice = 0; //amountPrice：总价
    var arrId = [], arrNum = [];

    //直接输入改变数量
    $('.choose-amount').on('input', '.buy-num', function () {
        var $this = $(this);
        var $reg = /^\d+$/g;
        var $value = parseInt($(this).val());
        if ($reg.test($value)) {
            if ($value >= $Max) {
                $(this).val($Max);
            } else if ($value <= 0) {
                $(this).val(1);
            } else {
                $(this).val($value);
            }
        } else {
            $(this).val(1);
        }
        if ($cart.length > 0) {
            singlePrice($this);
            addArrCookie($this.parents('.item').data('sid').toString(), parseInt($buyNum.val()));
        }
    });

    //加数量 数量不能超过99
    $chooseAmount.on('click', '.btn-add', function () {
        var $this = $(this);
        $buyNum = $this.siblings('.buy-num');
        $('.btn-reduce').removeClass('disabled');
        if (!$this.hasClass('disabled')) {
            $buyNum.val(parseInt($buyNum.val()) + 1);
            if ($buyNum.val() == $Max) {
                $this.addClass('disabled');
            }
            if ($cart.length > 0) {
                singlePrice($this);
                addArrCookie($this.parents('.item').data('sid').toString(), +1);
            }
        }
    });

    //减数量
    $chooseAmount.on('click', '.btn-reduce', function () {
        var $this = $(this);
        $buyNum = $this.siblings('.buy-num');
        $('.btn-add').removeClass('disabled');
        if (!$this.hasClass('disabled')) {
            $buyNum.val(parseInt($buyNum.val()) - 1);
            if ($buyNum.val() == 1) {
                $this.addClass('disabled');
            }
            if ($cart.length > 0) {
                singlePrice($this);
                addArrCookie($this.parents('.item').data('sid').toString(), -1);
            }
        }
    });

    //获取历史添加的cookie
    getArrCookie();

    //拼接历史添加的商品
    if (arrId.length === 0 && arrNum.length === 0) {
        $('#settleup .cart_pop').show();
        $('#settleup-content').hide();
        $('.cart__empty').show();
    } else {
        $('.cart__content').show();
        proList(arrId, arrNum);
    }

    //点击添加购物车
    $cartBtn.on('click', function () {
        if(!$.cookie('name') || $.cookie('name')=='null'){
            location.href='http://127.0.0.1/JD/src/login.html';
            return;
        }
        addArrCookie(productId, parseInt($('.buy-num').val()));
    });

    //获取cookie
    function getArrCookie() {
        if (!!$.cookie('strId') && !!$.cookie('strNum')) {
            arrId = $.cookie('strId').split(',');
            arrNum = $.cookie('strNum').split(',');
        }
    }

    //详情页第一次添加此商品
    function firstAdd() {
        var price = $('.sku__price .price i').html();
        var title = $('.sku__name').html();
        var url = $('.spic img').attr('src');
        var num = $('.buy-num').val();
        var str = '<div class="item" data-sid="' + productId + '">' +
            '<div class="p-img pull-left">' +
            '<a href="http://127.0.0.1/JD/src/details.html?sid=' + productId + '" target="_blank">' +
            '<img src="' + url + '" />' +
            '</a>' +
            '</div>' +
            '<div class="p-name pull-left">' +
            '<a href="http://127.0.0.1/JD/src/details.html?sid=' + productId + '" target="_blank" title="' + title + '">' + title + '</a>' +
            '</div>' +
            '<div class="p-detail pull-right">' +
            '<span class="p-price">' +
            '<strong>￥<span>' + price + '</span>X<em>' + num + '</em></strong>' +
            '</span>' +
            '<a href="javascript:void(0);" class="delete">删除</a>' +
            '</div>' +
            '</div>';
        $('.cart_pop').hide();
        $('.cart_empty').hide();
        $('#settleup-content .smc').append(str);
        $('#settleup-content').show();
        $('#toobarCart .toolbar__cart__list').show().append(str);
    }

    //详情页已经添加过的商品更新数据
    function secAdd(id, num) {
        $('#settleup-content .item').each(function () {
            var $this = $(this);
            if ($this.data('sid') == id) {
                $this.find('.p-price em').html(parseInt($this.find('.p-price em').html()) + parseInt(num));
            }
        });
    }

    //详情页面计算商品总数和总价
    function calcDetail() {
        var $sum = 0;
        var $count = 0;
        $('#settleup-content .item').each(function (index, ele) {
            $sum += parseInt($(ele).find('.p-price em').html());
            $count += parseFloat($(ele).find('.p-price span').html()) * parseInt($(ele).find('.p-price em').html());
        });
        $('#shoppingAmount').html($sum);
        $('.p-total b').html($sum);
        $('.total-price').html($count.toFixed(2));
        $('#toolCart').html($sum);
        $('.cart__count .num').html($sum);
        $('.cart__count .total').html($count.toFixed(2));
    }

    //添加cookie，购物车数量也对应改变
    function addArrCookie(id, num) {
        getArrCookie();
        //第一次添加此商品
        if ($.inArray(id, arrId) === -1) {
            arrId.push(id);
            arrNum.push(num);
            firstAdd();
        } else {
            arrNum[$.inArray(id, arrId)] = parseInt(arrNum[$.inArray(id, arrId)]) + num;
            secAdd(id, num);
        }
        $.cookie('strId', arrId.join(','), {expires: 7});
        $.cookie('strNum', arrNum.join(','), {expires: 7});
        $cart.length > 0 ? calcToltal() : calcDetail();
        alert('已加入購物車🛒');
    }

    //拼接商品列表
    function proList(arrId, arrNum) {
        console.log(arrId, arrNum);
        $.ajax({
            url: 'http://127.0.0.1/JD/php/productList.php',
            type: 'get',
            dataType: 'json'
        }).done(function (data) {
            var str = '';
            amountSum = 0;
            amountPrice = 0;
            $.each(data, function (index, value) {
                var i = $.inArray(value.sid, arrId);
                if (i !== -1) {
                    amountSum += parseInt(arrNum[i]);
                    amountPrice += value.price * arrNum[i];
                    //判断当前页面是否是购物车页，购物车页结构和其他页面结构不同
                    console.log(value);
                    if ($cart.length > 0) {
                        str += '<div class="item" data-sid="' + value.sid + '">' +
                            '<input type="checkbox" checked class="cell cart__chec"/>' +
                            '<div class="cell cart__goods">' +
                            '<a href="http://127.0.0.1/JD/src/details.html?sid=' + value.sid + '" target="_blank">' +
                            '<img class="cart__goods__img" src="' + mImgUrl + value.urls.split(',')[0] + '" />' +
                            '</a>' +
                            '<div class="cart__goods__desc">' +
                            '<a class="cart__goods__name" href="http://127.0.0.1/JD/src/details.html?sid=' + value.sid + '" target="_blank" title="">' +
                            '<p class="cart__goods__name">' + value.title + '</p>' +
                            '</a>' +
                            '<p class="cart__goods__color">红色</p>' +
                            '</div>' +
                            '</div>' +
                            '<div class="cell cart__price">¥<span>' + value.price + '</span></div>' +
                            '<div class="cell cart__quantity">' +
                            '<a href="javascript:void(0);" class="btn-reduce ">-</a>' +
                            '<input autocomplete="off" type="text" class="itxt buy-num" value="' + arrNum[i] + '"/>' +
                            '<a href="javascript:void(0);" class="btn-add">+</a>' +
                            '</div>' +
                            '<div class="cell cart__sum"><strong>¥<em>' + (value.price * arrNum[i]) + '</em></strong></div>' +
                            '<div class="cell cart__action"><a href="javascript:void(0);" class="js-remove">删除</a></div>' +
                            '</div>';
                    } else {
                        str += '<div class="item" data-sid="' + value.sid + '">' +
                            '<div class="p-img pull-left">' +
                            '<a href="http://127.0.0.1/JD/src/details.html?sid=' + +value.sid + '" target="_blank">' +
                            '<img src="' + mImgUrl + value.urls.split(',')[0] + '" />' +
                            '</a>' +
                            '</div>' +
                            '<div class="p-name pull-left">' +
                            '<a href="http://127.0.0.1/JD/src/details.html?sid=' + +value.sid + '" target="_blank" title="">' + value.title + '</a>' +
                            '</div>' +
                            '<div class="p-detail pull-right">' +
                            '<span class="p-price">' +
                            '<strong>￥<span>' + value.price + '</span>X<em>' + arrNum[i] + '</em></strong>' +
                            '</span>' +
                            '<a href="javascript:void(0);" class="delete">删除</a>' +
                            '</div>' +
                            '</div>';
                    }
                }
            });
            //塞数据
            if ($cart.length > 0) {
                $('.number', $cart).html(amountSum);
                $('.cart__list', $cart).html(str);
                $('.amount__sum em', $cart).html(amountSum);
                $('.amount__price span', $cart).html(amountPrice);
            } else {
                $settleupContent.show().find('.smc').html(str);
                $('#toobarCart .cart_empty').hide();
                $('#toobarCart .toolbar__cart__list').html(str);
                $settleupContent.find('.p-total b').html(amountSum);
                $shoppingAmount.html(amountSum);
                $('#toolCart').html(amountSum);
                $('#toobarCart .num').html(amountSum);
                $settleupContent.find('.total-price').html(amountPrice);
                $('#toobarCart .total i').html(amountPrice);
                $cartPop.hide();
            }

        });
    }

    //删除购物车中的商品
    $settleupContent.on('click', '.delete', function () {
        var id = $(this).parents('.item').data('sid');
        $(this).parents('.item').remove();
        $('#toobarCart .item').each(function () {
            if ($(this).data('sid') == id) {
                $(this).remove();
            }
        });
        deletePro(id);
    });
    $('#toobarCart').on('click', '.delete', function () {
        var id = $(this).parents('.item').data('sid');
        $(this).parents('.item').remove();
        $('.item', $settleupContent).each(function () {
            if ($(this).data('sid') == id) {
                $(this).remove();
            }
        });
        deletePro(id);
    });
    $('.choose-amount').on('click', '.js-remove', function () {
        var id = $(this).parents('.item').data('sid');
        $(this).parents('.item').remove();
        deletePro(id);
    });

    //删除购物车中的商品
    function deletePro(id) {
        //IE8不支持 indexOf()方法
        // var index = arrId.indexOf(id);
        var index = $.inArray(id,arrId);
        arrId.splice(index, 1);
        arrNum.splice(index, 1);
        $.cookie('strId', arrId.join(','), {expires: 7});
        $.cookie('strNum', arrNum.join(','), {expires: 7});
        if (arrId.length === 0 && arrNum.length === 0) {
            $shoppingAmount.html(0);
            $('#toolCart').html(0);
            $('.cart_empty').show();
            $('.toolbar__cart__list').hide().html('');
            $('#toobarCart .num').html(0);
            $('#toobarCart .total').html(0);
            $('#settleup .cart_pop').show();
            $('#settleup-content').hide();
            $('.cart__content').hide();
            $('.cart__empty').show();
        }
        $cart.length > 0 ? calcToltal() : calcDetail();
    }

    //全选
    $('.allsel').on('change', function () {
        $('.cart__list .item').find(':checkbox').prop('checked', $(this).prop('checked'));
        $('.allsel').prop('checked', $(this).prop('checked'));
        calcToltal();
    });

    var $inputs = $('.cart__list .item').find(':checkbox');
    $('.cart__list').on('change', $inputs, function () {
        if ($('.cart__list .item').find('input:checkbox').length == $('.cart__list .item').find('input:checked').size()) {
            $('.allsel').prop('checked', true);
        } else {
            $('.allsel').prop('checked', false);
        }
        calcToltal();
    });

    //购物车页面商品数量改变后单个商品的总价
    function singlePrice(obj) {
        var price = parseInt(obj.parents('.item').find('.cart__price span').html());
        var num = parseInt(obj.parents('.item').find('.cart__quantity .buy-num').val());
        obj.parents('.item').find('.cart__sum em').html((price * num).toFixed(2));
    }


    //购物车页面计算商品总数和总价
    function calcToltal() {
        var $sum = 0;
        var $count = 0;
        var $total = 0;
        $('.cart__list .item').each(function (index, ele) {
            $total += parseInt($(ele).find('.buy-num').val());
            if ($(ele).find('.cart__chec').prop('checked')) {
                $sum += parseInt($(ele).find('.buy-num').val());
                $count += parseFloat($(ele).find('.cart__sum em').html());
            }
        });
        $('.cart__title .number').html($total);
        $('.amount__sum em').html($sum);
        $('.amount__price span').html($count.toFixed(2));
    }

    //删除选中的商品
    $('.remove-batch').on('click', function () {
        if (confirm('你确定要删除选中吗？')) {
            $('.cart__list .item').each(function (index, ele) {
                if ($(ele).find('.cart__chec').prop('checked')) {
                    deletePro($(ele).data('sid'));
                    $(ele).remove();
                }
            });
        }
    });

});