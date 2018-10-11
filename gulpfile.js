const gulp = require('gulp')

gulp.task('default', ['html', 'css', 'js', 'img'])

gulp.task('html', () => {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('build'))
})
