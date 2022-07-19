import gulp from 'gulp';
import webScripts from './web-scripts';
import webServer from './web-serve';
import webStyles from './web-styles';
import webTemplate from './web-template';


export const webProcess = gulp.series(
	webTemplate,
	webStyles,
	webScripts,
	webServer
);