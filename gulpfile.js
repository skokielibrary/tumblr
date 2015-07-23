var gulp = require('gulp'), 
  sass = require('gulp-sass') ,
  autoprefixer = require('gulp-autoprefixer'),
  minifycss = require('gulp-minify-css'),
  inlinesource = require('gulp-inline-source'),
  browserSync = require('browser-sync')
  //concat = require('gulp-concat'),
  //uglify = require('gulp-uglify')

var config = {
    sass_path: 'src/assets/scss',
    css_path: 'src/assets/css',
    js_src_path: 'src/assets/js/src',
    js_path: 'dist/assets/js',
    bower_dir: 'bower_components'
}

gulp.task('sass', function () {
    gulp.src(config.sass_path + '/*.scss')
    .pipe(sass({ includePaths : [config.sass_path, config.bower_dir + '/normalize-scss/'] }))
    .pipe(autoprefixer({browsers: ['last 2 versions'],cascade: false}))
    .pipe(minifycss())
    .pipe(gulp.dest(config.css_path))
});

gulp.task('inlinesource', function () {
    return gulp.src('./src/*.html')
        .pipe(inlinesource())
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.reload({stream:true}))
});


/*gulp.task('js', function(){
  gulp.src([config.bower_dir + '/svg4everybody/svg4everybody.js', config.js_src_path + '/*.js'])
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(gulp.dest(config.js_path))
});*/

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'dist/'
        },
    });
});

gulp.task('browser-sync-reload', function(){
  browserSync.reload();
})

//watch sass for changes
gulp.task('watch', function() {
  gulp.watch('src/assets/scss/*.scss', ['sass', 'inlinesource']);
  gulp.watch('src/**/*.html', ['inlinesource']);
});

gulp.task('build', ['sass', 'inlinesource']);

gulp.task('default', ['sass', 'inlinesource', 'watch']);
