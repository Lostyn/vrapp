import gulp from 'gulp';
import commonScripts from './common-scripts';
import { rendererProcess } from './renderer-process';
import viewsWatch, { viewsWatchElectron } from './views-watch';
import { webProcess } from './web';

export const views = gulp.series(
	commonScripts,
	rendererProcess,
	webProcess,
	viewsWatch
);

export const electronView = gulp.series(
	commonScripts,
	rendererProcess,
	viewsWatchElectron
)