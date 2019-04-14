const {resolve, join} = require('path');
const {ghu, jszip, less, babel, mapfn, pug, read, remove, uglify, wrap, write} = require('ghu');

const ROOT = resolve(__dirname);
const SRC = join(ROOT, 'src');
const BUILD = join(ROOT, 'build');
const DIST = join(ROOT, 'dist');

ghu.defaults('release');

ghu.before(runtime => {
    runtime.pkg = Object.assign({}, require('./package.json'));
    runtime.comment = `${runtime.pkg.name} v${runtime.pkg.version} - ${runtime.pkg.homepage}`;
    runtime.commentJs = `/*! ${runtime.comment} */\n`;

    console.log(runtime.comment);
});

ghu.task('clean', 'delete build folder', () => {
    return remove(`${BUILD}, ${DIST}`);
});

ghu.task('build:scripts', runtime => {
    return read(`${SRC}/${runtime.pkg.name}.js`)
        .then(babel({presets: ['@babel/preset-env']}))
        .then(wrap(runtime.commentJs))
        .then(write(`${DIST}/${runtime.pkg.name}.js`, {overwrite: true}))
        .then(write(`${BUILD}/${runtime.pkg.name}-${runtime.pkg.version}.js`, {overwrite: true}))
        .then(uglify())
        .then(wrap(runtime.commentJs))
        .then(write(`${DIST}/${runtime.pkg.name}.min.js`, {overwrite: true}))
        .then(write(`${BUILD}/${runtime.pkg.name}-${runtime.pkg.version}.min.js`, {overwrite: true}));
});

ghu.task('build:demo', runtime => {
    const mapper = mapfn.p(SRC, BUILD).s('.less', '.css').s('.pug', '');

    return Promise.all([
        read(`${SRC}/demo/*.pug`)
            .then(pug({pkg: runtime.pkg}))
            .then(write(mapper, {overwrite: true})),
        read(`${SRC}/demo/*.less`)
            .then(less())
            .then(write(mapper, {overwrite: true})),
        read(`${SRC}/demo/*.js`)
            .then(babel({presets: ['@babel/preset-env']}))
            .then(write(mapper, {overwrite: true})),

        read(`${ROOT}/node_modules/jquery/dist/jquery.min.js`)
            .then(write(`${BUILD}/demo/jquery.js`, {overwrite: true})),
        read(`${ROOT}/node_modules/jquery-mousewheel/jquery.mousewheel.js`)
            .then(write(`${BUILD}/demo/jquery.mousewheel.js`, {overwrite: true})),
        read(`${ROOT}/node_modules/normalize.css/normalize.css`)
            .then(write(`${BUILD}/demo/normalize.css`, {overwrite: true}))
    ]);
});

ghu.task('build:copy', () => {
    return read(`${ROOT}/*.md`)
        .then(write(mapfn.p(ROOT, BUILD), {overwrite: true}));
});

ghu.task('build', ['build:scripts', 'build:demo', 'build:copy']);

ghu.task('zip', ['build'], runtime => {
    return read(`${BUILD}/**`)
        .then(jszip({dir: BUILD, level: 9}))
        .then(write(`${BUILD}/${runtime.pkg.name}-${runtime.pkg.version}.zip`, {overwrite: true}));
});

ghu.task('release', ['clean', 'zip']);
