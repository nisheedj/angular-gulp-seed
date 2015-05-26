/*!
 * gulpfile.js
 * The file for automating the build
 *
 * @project   Angular gulp seed
 * @author    Nisheed Jagadish, <nisheedj@thoughtworks.com>
 *
 */

var BOWERPATHS = {
  bootstrap: {
    less: ['bower_components/bootstrap/less/**/*.less'],
    fonts: ['bower_components/bootstrap/fonts/*.*'],
    js: ['bower_components/bootstrap/dist/js/bootstrap*.js']
  },
  angular: {
    js: ['bower_components/angular/angular*.*']
  },
  jquery: {
    js: ['bower_components/jquery/dist/jquery*.*']
  },
  requirejs: {
    js: ['bower_components/requirejs/require*.*']
  },
  almond: {
    js: ['bower_components/almond/almond*.*']
  }
};

var APPPATHS = {
  js: {
    src: ['app/js/**/*.*', '!app/js/vendor/**/*.*', '!app/js/build.js'],
    dest: 'app/js/vendor'
  },
  css: {
    dest: 'app/css'
  },
  less: {
    watchSrc: ['app/less/**/*.less'],
    bootstrap: {
      src: ['app/less/bootstrap/bootstrap.less'],
      dest: 'app/less/bootstrap'
    },
    theme: {
      src: ['app/less/theme/styles.less']
    }
  },
  fonts: {
    bootstrap: {
      dest: 'app/fonts/bootstrap'
    }
  },
  rjs: {
    main: './app/js/rmain.js',
    config: './app/js/rconfig.js',
  }
}

var RJCONFIG = {
  baseUrl: './app/js',
  mainConfigFile: APPPATHS.rjs.config,
  include: ['app', 'rmain'],
  out: 'app/js/build.js',
  optimize: 'uglify2',
  name: 'vendor/almond',
  preserveLicenseComments: false,
  wrap: true
};

var pkg = require('./package.json'),
  //Wire up all the plugins need to run gulp tasks
  gulp = require('gulp'),
  //Path Util
  path = require('path'),
  //Console colors
  colors = require('colors/safe'),
  //Test for errors in JS files
  jshint = require('gulp-jshint'),
  //compress the JS files
  uglify = require('gulp-uglify'),
  //Compile less files to css
  less = require('gulp-less'),
  //Minify CSS
  minifyCSS = require('gulp-minify-css'),
  //Keep gulp running even on errors
  plumber = require('gulp-plumber'),
  //Clean the folders before build
  del = require('del'),
  //Concatinate files
  concat = require('gulp-concat'),
  //Rename files or folder structures
  rename = require('gulp-rename'),
  //Require JS optimizer
  requirejs = require('requirejs'),
  //Use live reload extension
  livereload = require('gulp-livereload'),
  //Use undersore
  _ = require('underscore'),
  //Karma Unit testing
  karma = require('karma').server;


gulp.task('copy-assets-js', function() {
  var sources = _.union(BOWERPATHS.bootstrap.js, BOWERPATHS.angular.js, BOWERPATHS.jquery.js, BOWERPATHS.requirejs.js, BOWERPATHS.almond.js);
  return gulp
    .src(sources)
    .pipe(plumber())
    .pipe(gulp.dest(APPPATHS.js.dest));
});

gulp.task('copy-assets-less', function() {
  var sources = BOWERPATHS.bootstrap.less;
  return gulp
    .src(sources)
    .pipe(plumber())
    .pipe(gulp.dest(APPPATHS.less.bootstrap.dest));
});

gulp.task('copy-assets-fonts', function() {
  var sources = BOWERPATHS.bootstrap.fonts;
  return gulp
    .src(sources)
    .pipe(plumber())
    .pipe(gulp.dest(APPPATHS.fonts.bootstrap.dest));
});

gulp.task('delete-assets-js', function(cb) {
  del(APPPATHS.js.dest, {
    force: true
  }, function() {
    cb();
  });
});

gulp.task('delete-assets-less', function(cb) {
  del(APPPATHS.less.bootstrap.dest, {
    force: true
  }, function() {
    cb();
  });
});

gulp.task('copy-assets', ['delete-assets-js', 'delete-assets-less'], function() {
  gulp.start('copy-assets-js', 'copy-assets-less', 'copy-assets-fonts');
});

gulp.task('requirejs', function(cb) {
  console.info('Please wait while the file is built...');
  requirejs.optimize(RJCONFIG, function(buildResponse) {
    console.log('Completed requirejs build!');
    cb();
  }, function(err) {
    console.error(err);
    cb();
  });
});

gulp.task('jshint', function() {
  return gulp.src(APPPATHS.js.src)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('less-bootstrap', function() {
  return gulp.src(APPPATHS.less.bootstrap.src)
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(gulp.dest('app/css'));
});

gulp.task('less-theme', function() {
  return gulp.src(APPPATHS.less.theme.src)
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(gulp.dest('app/css'));
});

gulp.task('watch', function() {
  gulp.watch(APPPATHS.js.src, ['jshint']);
  gulp.watch(APPPATHS.less.watchSrc, ['less-bootstrap', 'less-theme']);
});