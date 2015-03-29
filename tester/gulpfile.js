var gulp        = require('gulp');
var plumber     = require('gulp-plumber');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var reload      = browserSync.reload;
var postcss     = require('gulp-postcss');
var autoprefixer = require('autoprefixer-core');

var express = require('express');
var deployd = require('deployd');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server, {'log level': 0});
var settings = {
  //host: '10.206.90.196',
  host: '192.168.1.96',
  httpPort: 4321,
  depPort: 27017,
  depDBname: 'tester'
};

gulp.task('deployd', function(){
  deployd.attach(server, {
    socketIo: io,
    env: 'development',
    db: {host: settings.host, port: settings.depPort, name: settings.depDBname}
  });
  app.use(server.handleRequest);
  server.listen(settings.httpPort, settings.host, function () {
    console.log('HTTP server is listening on: http://' + settings.host + ':' + settings.httpPort);
    console.log('Deployd is listening on: http://' + settings.host + ':' + settings.depPort);
  });
});

gulp.task('serve', ['sass'], function() {
  browserSync({
    proxy: settings.host + ':' + settings.httpPort
  });
  gulp.watch("./*.scss", ['sass','postcss']);
  gulp.watch("./public/*.html").on('change', reload);
});

gulp.task('sass', function() {
  return gulp.src("./style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest("public/css/"))
    .pipe(reload({stream: true}));
});

gulp.task('postcss', ['sass'], function() {
  var processors = [
    autoprefixer({browsers: ['last 4 version']})
  ];
  return gulp.src('./public/css/style.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest('./public/css/'));
});

gulp.task('default', ['deployd','serve']);