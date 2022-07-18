import gulp from 'gulp';
import { electronTemplate } from './template';

export const rendererProcess = gulp.series(
	electronTemplate
);