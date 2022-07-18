import gulp from 'gulp';
import { electronServer } from '../common/electron';
import { script } from '../globs';
import mainScripts from './main-scripts';

const restart = (done) => {
	electronServer.restart();
}

export default function mainWatch(done) {
	gulp.watch(`src/electron-main/${script}`, gulp.series(mainScripts, restart));

	done();
}