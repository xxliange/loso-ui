/**
 * @name gulpfile.js
 */

const path = require("path");
const { src, dest, series, parallel } = require("gulp");
const concat = require("gulp-concat");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const cssnano = require("gulp-cssnano");
const size = require("gulp-filesize");
const sourcemaps = require("gulp-sourcemaps");
const rename = require("gulp-rename");
const { name } = require("../package.json");
const browserList = [
    "last 2 versions",
    "Android >= 4.0",
    "Firefox ESR",
    "not ie < 9"
];

const DIR = {
    sass: path.resolve(__dirname, "../components/**/*.scss"),
    buildSrc: [
        path.resolve(__dirname, "../components/**/styles.scss"),
        path.resolve(__dirname, "../components/**/index.scss")
    ],
    lib: path.resolve(__dirname, "../lib"),
    es: path.resolve(__dirname, "../es"),
    dist: path.resolve(__dirname, "../dist")
};

function copySass() {
    return src(DIR.sass)
        .pipe(dest(DIR.lib))
        .pipe(dest(DIR.es))
};

function copyCss() {
    return src(DIR.buildSrc)
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: "compressed"
        }))
        .pipe(autoprefixer({ browsers: browserList }))
        .pipe(size())
        .pipe(cssnano())
        .pipe(dest(DIR.lib))
        .pipe(dest(DIR.es))
};

function dist() {
    return src(DIR.buildSrc)
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: "compressed"
        }))
        .pipe(autoprefixer({ browsers: browserList }))
        .pipe(concat(`${name}.css`))
        .pipe(size())
        .pipe(dest(DIR.dist))
        .pipe(sourcemaps.write())
        .pipe(rename(`${name}.css.map`))
        .pipe(dest(DIR.dist))

        .pipe(cssnano())
        .pipe(concat(`${name}.min.css`))
        .pipe(size())
        .pipe(dest(DIR.dist))
        .pipe(sourcemaps.write())
        .pipe(rename(`${name}.min.css.map`))
        .pipe(size())
        .pipe(dest(DIR.dist));
};

exports.default = series(parallel(copyCss, copySass, dist));
