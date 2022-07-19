import gulp from 'gulp';
import inject from 'gulp-inject-string';

export default function webTemplate() {
	return gulp.src(`src/app-views/web/index.html`)
		.pipe(inject.before('</head>', `    <link href=\"./main.css" rel="stylesheet">\n`))
		.pipe(inject.before('</body>', `    <script src=\"./index.js\" ></script>\n`))
		.pipe(gulp.dest(`dist/app-views/web`));
}