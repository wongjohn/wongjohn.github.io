var gulp = require('gulp');
var shell = require('gulp-shell');
var browserSyc = require('browser-sync').create();
var del =require('del');

gulp.task('build', shell.task(['jekyll build --watch']));

gulp.task('serve', function () {
    browserSyc.init({server: {baseDir: '_site/'}});

    gulp.watch('_site/**/*.*').on('change', browserSyc.reload);
});

gulp.task('default', ['build', 'serve']);
