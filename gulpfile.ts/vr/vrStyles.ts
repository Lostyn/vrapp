import gulp from 'gulp';
import paths from '../gulp.path';
import sass from 'gulp-dart-sass'
import prefix from 'gulp-autoprefixer';
import concat from 'gulp-concat'

export default function vrStyles() {
	return gulp.src(paths.vrView.styles)
		.pipe(sass({
			outputStyle: 'expanded'
		}).on('error', sass.logError))
		.pipe(prefix({
			cascade: true,
			remove: true
		}))
		.pipe(concat('main.css'))
		.pipe(gulp.dest(paths.vrView.buildDir));
}