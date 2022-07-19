import gulp from 'gulp';
import sass from 'gulp-dart-sass';
import prefix from 'gulp-autoprefixer';
import concat from 'gulp-concat';
import { style } from '../../globs';

export default function webStyles() {
	return gulp.src(`src/app-views/web/${style}`)
		.pipe(
			sass({ outputStyle: 'expanded' })
				.on('error', sass.logError)
		)
		.pipe(prefix({ cascade: true, remove: true }))
		.pipe(concat('main.css'))
		.pipe(gulp.dest(`dist/app-views/web`));
}