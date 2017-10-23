const gulp = require('gulp');
const pug = require('gulp-pug');
const del = require ('del');
const data = require('gulp-data');
const fs = require('fs');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const uglify = require('gulp-uglify');

const paths = {
    src: 'public',
    dist: 'dist'
};

/* ---------------------------------------------------------------------------------------
Get js files, create sourcemap, concatanate to global.js
minify global.js and rename it all.min.js and put in dist/scripts reload if necessary
---------------------------------------------------------------------------------------*/
gulp.task("concatJS", function(){
    return gulp.src(`${paths.src}/javascripts/**/*.js`)
        .pipe(concat('all.js'))
        .pipe(gulp.dest(`${paths.src}/javascripts`))
});
gulp.task('scripts', ['concatJS'], function(){
    return gulp.src(`${paths.src}/javascripts/all.js`)
        .pipe(uglify())
        .pipe(rename('all.min.js'))
        .pipe(gulp.dest(`${paths.dist}/javascripts`))
});
/* ---------------------------------------------------------------------------------------
 get global.scss and create sourcemap save scss as css
 minify global.css and rename it all.min.css and put in dist/styles reload if necessary
 ---------------------------------------------------------------------------------------*/
gulp.task('compile', function(){
    return gulp.src([
        `${paths.src}/stylesheets/main.css`,
        `${paths.src}/stylesheets/normalize.css`,
        `${paths.src}/stylesheets/style.css`
    ])
        .pipe(concat('all.css'))
        .pipe(gulp.dest(`${paths.src}/stylesheets`))
});
gulp.task('styles',['compile'],  function(){
    return gulp.src(`${paths.src}/stylesheets/all.css`)
        .pipe(cleanCSS())
        .pipe(rename('all.min.css'))
        .pipe(gulp.dest(`${paths.dist}/stylesheets`))
});
/* ---------------------------------------------------------------------------------------
 minifiy images using cache and add to folder called images in dist
 ---------------------------------------------------------------------------------------*/
gulp.task('images', function(){
    return gulp.src(`${paths.src}/images/*.+(png|jpg)`)
        .pipe(imagemin({ progressive: true }))
        .pipe(gulp.dest(`${paths.dist}/images`));
});



gulp.task('build', function() {
    return gulp.src('./views/**/*.pug')
        .pipe(data(function(file) {
            return JSON.parse(fs.readFileSync('./public/data/data.json'))
        }))
        .pipe(pug({
            pretty: true,
            basedir: './'
        }))
        .pipe(gulp.dest('/dist'));
});

/* ---------------------------------------------------------------------------------------
delete dist folder and everything in it
 ---------------------------------------------------------------------------------------*/
gulp.task('clean', function(){
    return del('dist');
});

gulp.task('cache:clear', function (callback) {
    return cache.clearAll(callback)
});
