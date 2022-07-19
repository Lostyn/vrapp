import gulp from 'gulp';
import commonScripts from './common-scripts';
import { rendererProcess } from './renderer-process';
import viewsWatch from './views-watch';
import { webProcess } from './web';

export const views = gulp.series(
	commonScripts,
	rendererProcess,
	webProcess,
	viewsWatch
);