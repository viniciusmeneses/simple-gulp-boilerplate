const gulp = require('gulp')
const sass = require('gulp-sass')
const concat = require('gulp-concat')
const env = require('gulp-environment')
const webserver = require('gulp-webserver')
const watch = require('gulp-watch')

gulp.task('default', ['html', 'scss', 'js', 'img'], () => {
  if (env.is.development()) {
    gulp.start('server')
  }
})

gulp.task('html', () => {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('build'))
})

gulp.task('scss', ['scss-vendor'], () => {
  return gulp.src('src/assets/scss/index.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('build/assets/css'))
})

gulp.task('scss-vendor', () => {
  return gulp.src('src/assets/scss/vendor/index.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('build/assets/css'))
})

gulp.task('js', ['js-vendor'], () => {
  return gulp.src('src/assets/js/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('build/assets/js'))
})

gulp.task('js-vendor', () => {
  return gulp.src('src/assets/js/vendor/**/*.js')
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('build/assets/js'))
})

gulp.task('img', () => {
  return gulp.src('src/assets/img/**/*.*')
  .pipe(gulp.dest('build/assets/img'))
})

gulp.task('server', ['watch'], () => {
  return gulp.src('build')
    .pipe(webserver({
      livereload: true,
      port: 8080,
      open: true
    }))
})

gulp.task('watch', () => {
  watch(['src/**/*.html'], () => gulp.start('html'))
  watch('src/assets/scss/**/*.scss', () => gulp.start('scss'))
  watch('src/assets/js/**/*.js', () => gulp.start('js'))
  watch('src/assets/imgs/**/*.*', () => gulp.start('img'))
})
