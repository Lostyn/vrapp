import gulp from "gulp";
import babel from "gulp-babel";
import browserify from "browserify";
import tsify from "tsify";

import source from "vinyl-source-stream";
import paths from '../gulp.path';

export function vrScript() {
	return browserify()
		.plugin(tsify, {})
		.add(paths.vrView.entryPoint)
		.bundle()
		.on("error", err => console.error(err))
		.pipe(source("index.js"))
		.pipe(gulp.dest(paths.vrView.buildDir));
}