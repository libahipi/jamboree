var gulp = require('gulp');
var lr = require('gulp-livereload');

gulp.task('watch', function() {
  lr.listen();
  gulp.watch([
    './index.html',
    './js/main.js',
    './css/main.css'
  ]).on('change', lr.changed);
});