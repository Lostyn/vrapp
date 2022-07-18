import gulp from 'gulp';
import { cert } from '../globs';

export default function httpsCert() {
	return gulp.src(`cert/${cert}`)
		.pipe(gulp.dest(`dist/cert`))
}