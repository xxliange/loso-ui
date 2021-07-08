/**
 * @name gulpfile.js
 */

const path = require("path");
const { src, dest, parallel } = require("gulp");
const concat = require("gulp-concat");
const less = require("gulp-less");
const autoprefixer = require("gulp-autoprefixer");
const cssnano = require("gulp-cssnano");
const size = require("gulp-filesize");
const sourcemaps = require("gulp-sourcemaps");
const babel = require("gulp-babel");
const through2 = require("through2");
const rename = require("gulp-rename");
const { name } = require("../package.json");
const browserList = [
    "last 2 versions",
    "Android >= 4.0",
    "Firefox ESR",
    "not ie < 9"
];


const DIR = {
    less: path.resolve(__dirname, "../components/**/*.less"),
    buildSrc: [
        path.resolve(__dirname, "../components/**/styles.less"),
        path.resolve(__dirname, "../components/**/index.less")
    ],
    lib: path.resolve(__dirname, "../lib"),
    es: path.resolve(__dirname, "../es"),
    dist: path.resolve(__dirname, "../dist"),
    scripts: path.resolve(__dirname, '../components/**/style/*.{ts,tsx}')
};

function cssInjection(content) {
    return content
        .replace(/\/style\/?'/g, "/style/css'")
        .replace(/\/style\/?"/g, '/style/css"')
        .replace(/\.less/g, '.css');
}
function compileScripts(babelEnv, destDir) {
    process.env.BABEL_ENV = babelEnv;
    return src(DIR.scripts)
        .pipe(babel()) // 使用gulp-babel处理
        .pipe(
            through2.obj(function z(file, encoding, next) {
                this.push(file.clone());
                // 找到目标
                if (file.path.match(/(\/|\\)style(\/|\\)index\.js/)) {
                    const content = file.contents.toString(encoding);
                    file.contents = Buffer.from(cssInjection(content)); // 处理文件内容
                    file.path = file.path.replace(/index\.js/, 'css.js'); // 文件重命名
                    this.push(file); // 新增该文件
                    next();
                } else {
                    next();
                }
            }),
        )
        .pipe(dest(destDir));
}

function compileESM() {
    return compileScripts('es', DIR.es);
}

function compileLIB() {
    return compileScripts('lib', DIR.lib);
}


function copyLess() {
    return src(DIR.less)
        .pipe(dest(DIR.lib))
        .pipe(dest(DIR.es))
};

function copyCss() {
    return src(DIR.buildSrc)
        .pipe(sourcemaps.init())
        .pipe(less({
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
        .pipe(less({
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

exports.default = parallel(compileESM, compileLIB, copyCss, copyLess, dist);