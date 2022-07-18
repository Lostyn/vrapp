import gulp from 'gulp';
import babel from "gulp-babel";
import { script } from '../../globs';

export default function rendererScripts() {
	return gulp.src(`src/app-views/electron-renderer/${script}`)
		.pipe(babel())
		.pipe(gulp.dest(`src/app-views/electron-renderer`));
}