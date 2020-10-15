'use strict'

const gulp = require('gulp'), 
    uglify = require('gulp-uglify'),
    mydel = require('del'),
    myimagemin = require('gulp-imagemin'),
    myrev = require('gulp-rev'),
    cleanCss = require('gulp-clean-css'),
    // flatmap = require('gulp-flatmap'),
    myusemin = require('gulp-usemin'),
    htmlmin = require('gulp-htmlmin');

gulp.task('clean', function() {
    return mydel(['dist']);
});

gulp.task('imagemin', function() {
    return gulp.src('./img/*')
    .pipe(myimagemin())
    .pipe(gulp.dest('dist/img'))
});

gulp.task('usemin', function() {
    return gulp.src('./index.html')
    .pipe(myusemin({
      css: [ cleanCss(), myrev() ],
      html: [ htmlmin({ collapseWhitespace: true }) ],
      js: [ uglify(), myrev() ],
      inlinejs: [ uglify() ],
      inlinecss: [ cleanCss(), 'concat' ]
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('build', gulp.series('clean', 'imagemin', 'usemin')
);