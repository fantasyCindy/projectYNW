/////////////////////////////////////////////
/*gulpfile所在目录作为服务器根目录*/
/*监听所有目录内html,scss,js文件,自动刷新浏览器*/
/////////////////////////////////////////////
var gulp = require('gulp');
var autoprefix = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var cssmin = require('gulp-minify-css');
var reload = browserSync.reload;

gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: "./"
    });
    gulp.watch("**/*.scss", ['sass']);
    gulp.watch("**/*.html").on('change', reload);
    gulp.watch("**/*.js").on('change', reload);
});

gulp.task('sass', function() {
    return gulp.src("**/*.scss")
        .pipe(sass())
        .pipe(autoprefix())
        .pipe(cssmin())
        .pipe(gulp.dest("./"))
});

gulp.task('default', ['serve']);
