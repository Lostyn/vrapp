import gulp from 'gulp';
import rendererScripts from './renderer-scripts';
import rendererStyles from './renderer-styles';
import rendererTemplate from './renderer-template';

export const rendererProcess = gulp.series(
	rendererTemplate,
	rendererStyles,
	rendererScripts
);