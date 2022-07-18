import gulp from 'gulp';

export function electronTemplate() {
	return gulp.src(`src/app-views/electron-renderer/index.html`)
		// .pipe(inject.after('<!--:js-->', `\n\t<script>require('./index.js');</script>`))
		// .pipe(inject.after('<!--:css-->', `\n\t\t<link href=\"index.css\" rel="stylesheet">`))
		.pipe(gulp.dest(`dist/app-views/electron-renderer`));

}