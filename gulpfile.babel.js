import babel from 'gulp-babel';
import envFile from 'node-env-file';
import fs from 'fs';
import gulp from 'gulp';
import nodemon from 'gulp-nodemon';
import rimraf from 'rimraf';
import sourcemaps from 'gulp-sourcemaps';

const SOURCE = {
  ALL: 'src/**/*.js',
  SERVER: 'src/server/*.js',
  SCHEDULER: 'src/scheduler/**/*.js',
  // SHARED: 'src/shared/**/*.js',
  // TEST: 'src/test/**/*.js',
  DIST: 'dist',
  DIST_SERVER: 'dist/server/',
  DIST_SCHEDULER: 'dist/scheduler/',
};

gulp.task('dev', ['build_server'], () => {
  envFile('./env.dev.list');
  nodemon({
    script: './dist/server/app.js',
    watch: [SOURCE.SERVER],
    tasks: ['build_server'],
    env: { NODE_ENV: 'development' }
  });
});

gulp.task('jobs', ['build_jobs'], () => {
  nodemon({
    script: './dist/jobs/scheduler.js',
    watch: [SOURCE.SCHEDULER],
    tasks: ['build_jobs'],
    env: { NODE_ENV: 'jobs'}
  })
});

gulp.task('build', ['clean'], () => gulp.src(SOURCE.ALL)
  .pipe(sourcemaps.init())
  .pipe(babel())
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(SOURCE.DIST)));

gulp.task('build_server', ['clean_server'], () => gulp.src(SOURCE.SERVER)
  .pipe(sourcemaps.init())
  .pipe(babel())
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(SOURCE.DIST_SERVER)));

gulp.task('build_jobs', ['clean_jobs'], () => gulp.src(SOURCE.SCHEDULER)
  .pipe(sourcemaps.init())
  .pipe(babel())
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(SOURCE.DIST_SCHEDULER)));

gulp.task('clean', () => rimraf.sync(SOURCE.DIST));
gulp.task('clean_server', () => rimraf.sync(SOURCE.DIST_SERVER));
gulp.task('clean_jobs', () => rimraf.sync(SOURCE.DIST_SCHEDULER));
