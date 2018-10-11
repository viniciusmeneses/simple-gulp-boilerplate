const gulp = require('gulp')
const concat = require('gulp-concat')
const env = require('gulp-environment')
const webserver = require('gulp-webserver')
const watch = require('gulp-watch')
const rename = require('gulp-rename')

const cleancss = require('gulp-clean-css')
const htmlmin = require('gulp-htmlmin')
const imagemin = require('gulp-imagemin')

const babel = require('gulp-babel')
const sass = require('gulp-sass')

gulp.task('default', ['html', 'scss', 'js', 'img'], () => {
  if (env.is.development()) {
    gulp.start('server')
  }
})

gulp.task('html', () => {
  return gulp.src('src/**/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('dist'))
})

gulp.task('scss', ['scss-vendor'], () => {
  return gulp.src('src/assets/scss/index.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('style.min.css'))
    .pipe(cleancss())
    .pipe(gulp.dest('dist/assets/css'))
})

gulp.task('scss-vendor', () => {
  return gulp.src('src/assets/scss/vendor/index.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('vendor.min.css'))
    .pipe(cleancss())
    .pipe(gulp.dest('dist/assets/css'))
})

gulp.task('js', ['js-vendor'], () => {
  return gulp.src('src/assets/js/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(rename((path) => {
      path.basename += '.min'
    }))
    .pipe(gulp.dest('dist/assets/js'))
})

gulp.task('js-vendor', () => {
  return gulp.src('src/assets/js/vendor/**/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('vendor.min.js'))
    .pipe(gulp.dest('dist/assets/js'))
})

gulp.task('img', () => {
  return gulp.src('src/assets/img/**/*.*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/assets/img'))
})

gulp.task('server', ['watch'], () => {
  return gulp.src('dist')
    .pipe(webserver({
      livereload: {
        enable: true
      },
      port: 8080,
      open: true
    }))
})

gulp.task('watch', () => {
  watch('src/**/*.html', () => gulp.start('html'))
  watch('src/assets/scss/**/*.scss', () => gulp.start('scss'))
  watch('src/assets/js/**/*.js', () => gulp.start('js'))
  watch('src/assets/imgs/**/*.*', () => gulp.start('img'))
})
