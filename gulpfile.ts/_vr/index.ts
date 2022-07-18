// import gulp from 'gulp';
// import paths from '../gulp.path';
// import vrStyles from './vrStyles';
// import inject from 'gulp-inject-string';
// import { vrScript } from './vrScript';
// import vrServe from './vrServer';

// export function vrTemplate() {
// 	return gulp.src(paths.vrView.html)
// 		.pipe(inject.before('</head>', `    <link href=\"./main.css" rel="stylesheet">\n`))
// 		.pipe(inject.before('</body>', `    <script src=\"./index.js\" ></script>\n`))
// 		.pipe(gulp.dest(paths.vrView.buildDir));
// }

// export const vrview = gulp.series(vrScript, vrTemplate, vrStyles, vrServe);