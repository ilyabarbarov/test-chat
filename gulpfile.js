const argv = require('yargs').argv;
const gulp = require("gulp");
const gulpIf = require('gulp-if');
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const clean = require("gulp-clean");
const sass = require("gulp-sass");
const browserify = require("browserify");
const babelify = require("babelify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");

const entries = {
    scss: "client/scss/index.scss",
    js: "client/js/index.jsx"
};

const filenames = {
    css: "index.min.css",
    js: "index.min.js"
};

const paths = {
   css: "server/static/css",
    js: "server/static/js"
};

process.env.NODE_ENV = argv.production && 'production';

gulp.task("css", () => {
    gulp.src(paths.css , {read: false})
        .pipe(clean({force: true}));

    gulp.src(entries.scss)
        .pipe(concat(filenames.css))
        .pipe(sass({outputStyle: argv.production ? "compressed" : "normal"}))
        .pipe(gulp.dest(paths.css));
});

gulp.task("js", () => {
    gulp.src(paths.css , {read: false})
        .pipe(clean({force: true}));

    browserify({entries: entries.js, extensions: [".js", ".jsx"]})
        .transform("babelify", {presets: ["es2015", "react"], "plugins": ["transform-object-rest-spread"]})
        .bundle()
        .pipe(source(filenames.js))
        .pipe(buffer())
        .pipe(gulpIf(argv.production, uglify()))
        .pipe(gulp.dest(paths.js));
});

gulp.task("build", ["css", "js"]);