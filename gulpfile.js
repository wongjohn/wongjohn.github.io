var gulp = require('gulp');
var shell = require('gulp-shell');
var browserSyc = require('browser-sync').create();
var del =require('del');

var dependencies = [
    'node_modules/bootstrap/dist/**/*.*',
    'node_modules/font-awesome/**/*.*',
    'node_modules/jquery/dist/**/*.*',
    'node_modules/bootstrap/dist/**/*.*'
];


gulp.task('clean:_site_node_modules', function (done) {
    del('_site/node_modules');
    done();
});

gulp.task('copy:dependencies', ['clean:_site_node_modules', function (done) {
    dependencies.forEach(function (dependency) {
        gulp.src(dependency)
            .pipe(gulp.dest('_site/' + dependency.replace(/\/\*\*\/\*\.\*/g, '/')));
    });
    done();
}]);

gulp.task('build', shell.task(['jekyll build --watch']));

gulp.task('serve', ['copy:dependencies', function () {

    browserSyc.init({server: {baseDir: '_site/'}});

    gulp.watch('_site/**/*.*').on('change', browserSyc.reload);

}]);

gulp.task('default', ['build', 'serve']);
