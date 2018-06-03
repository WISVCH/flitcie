const gulp = require('gulp');
const rollup = require('gulp-rollup');
const minify = require("gulp-babel-minify");
const del = require('del');

gulp.task('clean', () => del('dist/'))

gulp.task('rollup', () =>
  gulp.src(['./src/**/*.js', './assets/**.js'])
    .pipe(rollup({
      allowRealFiles: true,
      input: './src/components.js',
      output: {
        format: 'iife'
      }
    }))
    .pipe(minify())
    .pipe(gulp.dest('./dist/src'))
);

gulp.task('copy-dependencies', () =>
  gulp.src(['./assets/@webcomponents/**/*.js'])
    .pipe(gulp.dest('./dist/assets/@webcomponents'))
)

gulp.task('copy-source', () =>
  gulp.src(['index.html', 'index.css'])
    .pipe(gulp.dest('./dist'))
)

gulp.task('build', gulp.series('clean', gulp.parallel('rollup', 'copy-source', 'copy-dependencies')));
