import gulp from 'gulp';
import electron from '../common/electron';
import httpsCert from './main-cert';
import mainScripts from './main-scripts';
import mainWatch from './main-watch';

export const mainProcess = gulp.series(
	httpsCert,
	mainScripts,
	mainWatch,
	electron
)