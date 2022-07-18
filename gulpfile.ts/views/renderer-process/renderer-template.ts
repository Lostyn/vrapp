import gulp from 'gulp';
import inject from 'gulp-inject-string';

export default function rendererTemplate() {
	return gulp.src(`src/app-views/electron-renderer/index.html`)
		.pipe(inject.after('<!--:js-->', `\n\t<script>require('./index.js');</script>`))
		.pipe(inject.after('<!--:css-->', `\n\t\t<link href=\"index.css\" rel="stylesheet">`))
		.pipe(gulp.dest(`dist/app-views/electron-renderer`));
}