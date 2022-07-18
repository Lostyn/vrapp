// import gulp from 'gulp';
// import paths from '../gulp.path';

// import inject from 'gulp-inject-string';
// import appScripts from './appScripts';
// import appStyles from './appStyles';

// export function appTemplate() {
// 	return gulp.src(paths.app.html)
// 		.pipe(inject.after('<!--:js-->', `\n\t<script>require('./index.js');</script>`))
// 		.pipe(inject.after('<!--:css-->', `\n\t\t<link href=\"index.css\" rel="stylesheet">`))
// 		.pipe(gulp.dest(paths.app.buildDir));

// }

// export const app = gulp.series(appTemplate, appStyles, appScripts);