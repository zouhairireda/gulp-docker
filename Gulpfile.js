var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var minifyCSS = require('gulp-minify-css');
var del = require('del');
var runSequence = require('run-sequence');

gulp.task('hello', function() {
	console.log('Hello all');
});

gulp.task('sass', function() {
	return gulp.src('app/scss/**/*.scss')
	.pipe(sass())
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({
		stream: true
	}));
});

gulp.task('browserSync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		}
	});
});

gulp.task('useref', function() {
	//var assets = useref.assets();

	return gulp.src('app/*.html')
	//.pipe(assets)
	//.pipe(assets.restore())
	.pipe(gulpIf('*.js', uglify()))
	.pipe(gulpIf('*.css', minifyCSS()))
	.pipe(useref())
	.pipe(gulp.dest('dist'));
});

gulp.task('clean', function() {
	del('dist');
});
//gulp.watch('app/scss/**/*.scss', ['sass']);

gulp.task('watch', ['browserSync', 'sass'], function() {
	gulp.watch('app/scss/**/*.scss', ['sass']);
	gulp.watch('app/scss/**/*.scss', ['hello']);
});

gulp.task('build', function(callback) {
	runSequence('clean', ['sass', 'useref'], callback);
});

gulp.task('default', function(callback) {
	runSequence(['sass', 'browserSync', 'watch'], callback);
});