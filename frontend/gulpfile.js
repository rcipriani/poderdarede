const gulp = require('gulp');
const del = require('del');
const typescript = require('gulp-typescript');
//by http://blog.scottlogic.com/2015/12/24/creating-an-angular-2-build.html

const tscConfig = require('./tsconfig.json');
const sourcemaps = require('gulp-sourcemaps');
const tslint = require('gulp-tslint');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const tsconfig = require('tsconfig-glob');

// clean the contents of the distribution directory
gulp.task('clean', function () {
  return del(['dist/**/*', 'dist/poderdarede/.htaccess', '!dist/poderdarede', '!dist/poderdarede/node_modules', '!dist/poderdarede/node_modules/**/*']);
});

// copy static assets - i.e. non TypeScript compiled source
gulp.task('copy:assets', ['clean'], function() {
  return gulp.src(['poderdarede/**/*', 'styles.css', '!poderdarede/**/*.ts'], { base : './' })
    .pipe(gulp.dest('dist'))
});

// copy dependencies
gulp.task('copy:libs', ['clean'], function() {
	gulp.src([
	          'node_modules/systemjs/dist/system.src.js',
	          'node_modules/rxjs/bundles/Rx.js',
	          'node_modules/bootstrap/dist/css/bootstrap.min.css',
	          'node_modules/bootstrap/dist/css/bootstrap.min.css.map',
	          'node_modules/jquery/dist/jquery.min.js',
	          'node_modules/bootstrap/dist/js/bootstrap.min.js',
	          'node_modules/es6-shim/es6-shim.min.js',
	          'node_modules/es6-shim/es6-shim.map',
	          'node_modules/zone.js/dist/zone.js',
	          'node_modules/reflect-metadata/Reflect.js',
	          'node_modules/reflect-metadata/Reflect.js.map',
	          'node_modules/systemjs/dist/system.src.js'
	        ]).pipe(gulp.dest('dist/poderdarede/lib'))

    // TODO tentar retirar os abaixo e incluir smente o que precisar
    // Angular
    gulp.src([
              'node_modules/@angular/**'
    ]).pipe(gulp.dest('dist/poderdarede/lib/@angular'))

    // angular2-in-memory-web-api
    gulp.src([
              'node_modules/angular2-in-memory-web-api/**'
    ]).pipe(gulp.dest('dist/poderdarede/lib/angular2-in-memory-web-api'))

    // rxjs
    gulp.src([
              'node_modules/rxjs/**'
    ]).pipe(gulp.dest('dist/poderdarede/lib/rxjs'))

});

// linting
gulp.task('tslint', function() {
  return gulp.src('poderdarede/**/*.ts')
    .pipe(tslint())
    .pipe(tslint.report('verbose'));
});


// TypeScript compile
gulp.task('compile', ['clean'], function () {
  return gulp
    .src(tscConfig.files)
    .pipe(sourcemaps.init())
    .pipe(typescript(tscConfig.compilerOptions))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/poderdarede/app'));
});

// update the tsconfig files based on the glob pattern
gulp.task('tsconfig-glob', function () {
  return tsconfig({
    configPath: '.',
    indent: 2
  });
});

// Run browsersync for development
gulp.task('serve', ['build'], function() {
  browserSync({
    server: {
      baseDir: 'dist/poderdarede'
    },
    open: 'external',
    host: 'localhost',
    port: 8080
  });

  gulp.watch(['poderdarede/**/*'], ['buildAndReload']);
});

//gulp.task('build', ['tslint', 'compile', 'copy:libs', 'copy:assets']);
//gulp.task('build', ['compile', 'copy:libs', 'copy:assets']);
gulp.task('build', ['compile', 'copy:assets']);
gulp.task('buildAndReload', ['build'], reload);
gulp.task('default', ['build']);
