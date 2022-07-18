import gulp from 'gulp';
import { script } from '../globs';
import babel from "gulp-babel";

export default function mainScripts() {
	return gulp.src(`src/electron-main/${script}`)
		.pipe(babel())
		.pipe(gulp.dest('dist/electron-main'));
}