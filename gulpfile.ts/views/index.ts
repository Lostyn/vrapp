import gulp from 'gulp';
import { rendererProcess } from './renderer-process';

export const views = gulp.series(
	rendererProcess
);