import gulp, { on } from 'gulp';
import babelify from 'babelify'
import browserify from "browserify";
import tsify from "tsify";
import source from "vinyl-source-stream";

export default function webScripts() {
	return browserify()
		.plugin(tsify, { target: 'es6' })
		.transform(babelify, { extensions: ['.tsx', '.ts'] })
		.add(`src/app-views/web/index.ts`)
		.bundle()
		.on('error', err => console.error(err))
		.pipe(source('index.js'))
		.pipe(gulp.dest(`dist/app-views/web`));
}