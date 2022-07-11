import gulp from 'gulp';
import { appTemplate } from './application';
import appScripts from './application/appScripts';
import paths from './gulp.path';
import { electronServer } from './application/appServe';
import { vrTemplate } from './vr';
import { reloadVr } from './vr/vrServer';
import vrStyles from './vr/vrStyles';
import { vrScript } from './vr/vrScript';
import appStyles from './application/appStyles';

const restartApp = (done) => {
	electronServer.restart();
	done();
}

const reloadApp = (done) => {
	electronServer.reload();
	done();
}

export default function watch(done) {
	gulp.watch(paths.app.main, gulp.series(appScripts, restartApp));

	gulp.watch(paths.app.html, gulp.series(appTemplate, reloadApp));
	gulp.watch(paths.app.renderer, gulp.series(appScripts, reloadApp));
	gulp.watch(paths.app.styles, gulp.series(appStyles, reloadApp));

	gulp.watch(paths.vrView.html, gulp.series(vrTemplate, reloadVr));
	gulp.watch(paths.vrView.styles, gulp.series(vrStyles, reloadVr));
	gulp.watch(paths.vrView.scripts, gulp.series(vrScript, reloadVr));

	done();
}