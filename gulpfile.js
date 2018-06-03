const gulp = require('gulp');
const rollup = require('gulp-rollup');
const minify = require("gulp-babel-minify");
const del = require('del');
const workboxBuild = require('workbox-build');

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
  gulp.src(['index.html', 'index.css', 'manifest.json'])
    .pipe(gulp.dest('./dist'))
)

gulp.task('generate-service-worker', () =>
  workboxBuild.generateSW({
    globDirectory: 'dist',
    globPatterns: [
      '**\/*.{html,json,js,css}',
    ],
    swDest: 'dist/service-worker.js',
    runtimeCaching: [
      {
        urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
        handler: 'cacheFirst',
        options: {
          cacheName: 'images-cache',
          expiration: {
            maxEntries: 50,
            // Cache for a maximum of a week
            maxAgeSeconds: 7 * 24 * 60 * 60,
          },
        },
      },
      {
        urlPattern: /^http:\/\/10\.54\.0\.4:8080/,
        handler: 'staleWhileRevalidate',
        options: {
          cacheName: 'api-cache',
          expiration: {
            // Cache for a maximum of a week
            maxAgeSeconds: 7 * 24 * 60 * 60,
          },
        },
      }
    ],
  })
)

gulp.task('generate-dist', gulp.parallel('rollup', 'copy-source', 'copy-dependencies'));

gulp.task('build', gulp.series(
  'clean',
  'generate-dist',
  'generate-service-worker'
));
