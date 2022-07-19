import gulp from 'gulp';
import babel from "gulp-babel";
import { script } from '../globs';

export default function commonScripts() {
	return gulp.src(`src/app-views/common/${script}`)
		.pipe(babel())
		.pipe(gulp.dest(`dist/app-views/common`));
}