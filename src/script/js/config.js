var rq_config = {
    baseUrl: 'script/js',
    paths: {
        jquery: 'https://cdn.bootcss.com/jquery/1.12.1/jquery',
        lazyload:'http://127.0.0.1/JD/src/script/thirdplugins/jquery.lazyload',
        validate:'http://127.0.0.1/JD/src/script/thirdplugins/jquery.validate',
        cookie:'http://127.0.0.1/JD/src/script/thirdplugins/jquery.cookie',
        //核心组件
        carousel: 'carousel',
        glass:'glass'
    },
    shim:{//让不支持AMD的模块支持。
        'tab':{
            deps:['jquery']
        },
        'lazyload':{
            deps:['jquery']
        },
        'count_down':{
            deps:['jquery']
        },
        'validate':{
            deps:['jquery']
        },
        'cookie':{
            deps:['jquery']
        }
    }
};