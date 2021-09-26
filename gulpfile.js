const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const rename = require('gulp-rename')
const cleanCSS = require('gulp-clean-css')
const sourcemaps = require('gulp-sourcemaps')
const autoprefixer = require('gulp-autoprefixer')
const browsersync = require('browser-sync').create()
const del = require('del')

const paths = {
  html: {
    src: './src/module-3/online-store/*.html',
    dest: './src/module-3/online-store/dist/'
  },
  styles: {
    src: './src/module-3/online-store/styles/**/*.scss',
    dest: './src/module-3/online-store/dist/css/'
  }
}

function clean() {
  return del('./src/module-3/online-store/dist/css/*')
}

function html() {
  return gulp.src(paths.html.src)
  .pipe(gulp.dest(paths.html.dest))
  .pipe(browsersync.stream())
}

function styles() {
  return gulp.src(paths.styles.src)
  .pipe(sourcemaps.init())
  .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
  .pipe(autoprefixer({ cascade: false }))
  .pipe(cleanCSS({ level: 2 }))
  .pipe(rename({ basename: 'style'}))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(paths.styles.dest))
  .pipe(browsersync.stream())
}


function watch() {
  browsersync.init({
    server: {
        baseDir: "./src/module-3/online-store/dist"
    }
  })
  gulp.watch(paths.html.dest).on('change', browsersync.reload)
  gulp.watch(paths.html.src, html)
  gulp.watch(paths.styles.src, styles)
}

exports.clean = clean
exports.html = html
exports.styles = styles
exports.watch = watch

exports.default = gulp.series(clean, html, gulp.parallel(styles), watch)