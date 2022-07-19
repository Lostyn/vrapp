import gulp from 'gulp';
import browserSync from 'browser-sync';

import { electronServer } from '../common/electron';
import { script, style } from '../globs';
import commonScripts from './common-scripts';
import rendererScripts from './renderer-process/renderer-scripts';
import rendererStyles from './renderer-process/renderer-styles';
import rendererTemplate from './renderer-process/renderer-template';
import webScripts from './web/web-scripts';
import webStyles from './web/web-styles';
import webTemplate from './web/web-template';

const reloadElec = (done) => {
	electronServer.reload();
	done();
}

const reloadWeb = (done) => {
	browserSync.reload();
	done();
}

const reloadAll = (done) => {
	electronServer.reload();
	browserSync.reload();
	done();
}


export default function viewsWatch(done) {

	gulp.watch(`src/app-views/electron-renderer/${script}`, gulp.series(rendererScripts, reloadElec));
	gulp.watch(`src/app-views/electron-renderer/index.html`, gulp.series(rendererTemplate, reloadElec));
	gulp.watch(`src/app-views/electron-renderer/${style}`, gulp.series(rendererStyles, reloadElec));

	gulp.watch(`src/app-views/common/${script}`, gulp.series(commonScripts, webScripts, reloadAll));

	gulp.watch(`src/app-views/web/${script}`, gulp.series(webScripts, reloadWeb));
	gulp.watch(`src/app-views/web/index.html`, gulp.series(webTemplate, reloadWeb));
	gulp.watch(`src/app-views/web/${style}`, gulp.series(webStyles, reloadWeb));

	done();
}