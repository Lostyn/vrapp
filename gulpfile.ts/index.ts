import gulp from "gulp";
import fs from 'fs';
import paths from "./gulp.path";
import { app } from './application';
import { vrview } from './vr';
import appServer from './application/appServe';
import watch from './watch';
import vrServe from './vr/vrServer';

function clean() {
  if (fs.existsSync(paths.buildDir))
    fs.rmSync(paths.buildDir, { recursive: true });

  return Promise.resolve();
}

function copyHttpsCert() {
  return gulp.src('./cert/*.pem')
    .pipe(gulp.dest('./dist/cert'))

}

function set(nodeEnv: string) {
  return () => {
    process.env.NODE_ENV = nodeEnv;
    return Promise.resolve();
  };
}

const prepare = gulp.series(
  clean,
  copyHttpsCert,
  vrview,
  app,
)

export const dev = gulp.series(set("development"), prepare, watch, appServer);
// export const dev = gulp.series(set("development"), prepare, electron);
// export const build = gulp.series(set('production'), prepare, pack);