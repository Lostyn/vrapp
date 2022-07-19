import gulp from "gulp";
import fs from 'fs';
import { mainProcess } from './main-process';
import { views } from './views';

function clean() {
  if (fs.existsSync(`dist`))
    fs.rmSync(`dist`, { recursive: true });

  return Promise.resolve();
}

function set(nodeEnv: string) {
  return () => {
    process.env.NODE_ENV = nodeEnv;
    return Promise.resolve();
  };
}

// const prepare = gulp.series(
//   clean,
//   copyHttpsCert,
//   vrview,
//   app,
// )


export const dev = gulp.series(
  clean,
  set("development"),
  views,
  mainProcess
);

// export const dev = gulp.series(set("development"), prepare, watch, appServer);
// export const build = gulp.series(set('production'), prepare, pack);