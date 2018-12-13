## JD前端开发说明
#### 一、开发框架说明
* sass
* jquery
* underscore

#### 二、前端文件目录说明
* dist目录为打包后文件夹
* src/scss文件夹保存项目内部src/scss文件
* common_js和common_css保存引入外部js/css文件，请在加入前确认加入文件是已压缩文件

#### 三、gulpfile说明
* 支持实时编译scss文件
* 支持实时用eslint检验js文件夹下代码（需要`npm i eslint -g`）
* 支持压缩js/css代码

#### 四、样式说明
* _normalize.scss文件是重置页面样式
* _var.scss文件保存有初始化颜色，请使用变量颜色
* _mixin.scss文件保存一些常用混合样式，以及一些浏览器兼容央视
* _common.scss文件保存有初始化颜色、组件等样式，请使用变量颜色
* class命名采用的是BEM命名法
* 事例代码
    ```html
         <div class="content">
           <h1 class="content__headline">Lorem ipsum dolor...</h1>
         </div>  
    ```
* id采用驼峰命名
* 需要使用js获取的元素，添加`js-`前缀的class名
* 公用的class采用的是小写字母，多个单词组成时，采用中划线`-`分隔