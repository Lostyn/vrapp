import gulp from 'gulp';
import sass from 'gulp-dart-sass';
import concat from 'gulp-concat';
import paths from "../gulp.path";

function fonts() {
	return gulp.src(paths.fonts)
		.pipe(gulp.dest(paths.buildDir));
}

function styles() {
	return gulp.src(paths.app.styles)
		.pipe(sass().on('error', sass.logError))
		.pipe(concat('index.css'))
		.pipe(gulp.dest(paths.app.distRenderer));
}

export default gulp.series(
	fonts,
	styles
)