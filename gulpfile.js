var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    sass = require('gulp-sass'),
    jade = require('gulp-jade'),
    babel = require('gulp-babel'),
    bower = require('gulp-bower'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    config = {
      style: {
        main: './app/sass/app.scss',
        watch: './app/**/*.scss',
        ouput: './build/css'
      },
      html: {
        watch: './app/*.html'
      },
      js: {
        main: './app/js/app.js',
        watch: './app/js/**/*.js',
        ouput: './build/js'
      },
      jade: {
        main: './app/index.jade',
        watch: './app/**/*.jade',
        ouput: './build'
      },
      bower: {
        main: './bower_components',
        ouput: './build/vendor'
      }
    };

gulp.task('server', function (){
  gulp.src('./build')
    .pipe(webserver({
      host: '0.0.0.0',
      port: 8080,
      livereload: true
    }));
});

gulp.task('bower', function() {
  return bower({
    directory: config.bower.main})
    .pipe(gulp.dest(config.bower.ouput))
});

gulp.task('build:css', function (){
  gulp.src(config.style.main)
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest(config.style.ouput));
});

gulp.task('build:js', function() {
	return gulp.src([config.js.main, config.js.watch])
    .pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['es2015']
		}))
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(config.js.ouput));
});

gulp.task('build:jade', function(){
  return gulp.src(config.jade.main)
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest(config.jade.ouput));
});

gulp.task('watch', function() {
  gulp.watch(config.js.watch, ['build:js']);
  gulp.watch(config.style.watch, ['build:css']);
  gulp.watch(config.jade.watch, ['build:jade']);
});

gulp.task('build', ['build:css', 'build:js', 'build:jade'])

gulp.task('default', ['server', 'watch', 'build', 'bower']);
