import gulp from 'gulp';
import sass from 'gulp-dart-sass';
import concat from 'gulp-concat';
import { font, style } from '../../globs';

function fonts() {
	return gulp.src(`src/app-views/electron-renderer/${font}`)
		.pipe(gulp.dest(`dist/app-views/electron-renderer`));
}

function styles() {
	return gulp.src(`src/app-views/electron-renderer/${style}`)
		.pipe(sass().on('error', sass.logError))
		.pipe(concat('index.css'))
		.pipe(gulp.dest(`dist/app-views/electron-renderer`));
}

export default gulp.parallel(
	fonts, styles
)