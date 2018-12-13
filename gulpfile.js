var gulp = require('gulp'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    uglify = require('gulp-uglify'),
    cssMinify = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    header = require('gulp-header'),
    eslint = require('gulp-eslint');

/**
 * sass 编译
 */
function swallowError(error) {
    // If you want details of the error in the console
    console.error(error.toString());
    this.emit('end')
}
gulp.task('sass', function () {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./src/css'))
});

/**
 * watch 实时编译sass 监控js
 */
gulp.task('watch', function () {
    gulp.watch('./src/scss/*.scss', ['sass']);
    gulp.watch('./src/js/*.js', ['jslint']);
});

/**
 * eslint
 */
gulp.task('jslint',function(){
    return gulp.src(['./src/js/*.js']) //指定的校验路径
        .pipe(eslint({configFle:"./.eslintrc"})) //使用你的eslint校验文件
        .pipe(eslint.format())
});

/**
 * JS压缩
 */
gulp.task('jsMin', function () {
    gulp.src('./src/js/*.js')
        .pipe(concat('link.js'))    //合并所有js到main.js
        .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
        .pipe(uglify({mangle: false, compress: true, ie8: true}))
        .pipe(header('/**\n * <%= file.relative %>\n * build at: <%= new Date() %>\n */\n'))
        .pipe(gulp.dest('./src/dist/js'));
});

/**
 * css压缩
 */
gulp.task('cssMin',function(){
    gulp.src('./src/css/*.css')
        .pipe(cssMinify({compatibility: "ie10"}))
        .pipe(concat('link.min.css'))
        .pipe(header('/**\n * <%= file.relative %>\n * build at: <%= new Date() %>\n */\n'))
        .pipe(gulp.dest('./src/dist/css'))
});

/**
 * JS CSS 压缩任务执行
 */
gulp.task('fileMin', ['jsMin', 'cssMin']);