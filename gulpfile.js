var gulp = require('gulp')
	, browserify = require('browserify')
	, babelify = require('babelify')
	, source = require('vinyl-source-stream')
	, buffer = require('vinyl-buffer')
	, watchify = require('watchify')
	, browserSync = require('browser-sync').create()
	, gp = require('gulp-load-plugins')()

let deploy = false

gulp.task('styles', function() {
	return gulp.src('src/ui/styles/main.scss')
		.pipe(gp.if(!deploy, gp.sourcemaps.init()))
		.pipe(gp.sass().on('error', gp.sass.logError))
		.pipe(gp.autoprefixer())
		.pipe(gp.if(!deploy, gp.sourcemaps.write()))
		.pipe(gp.if(!deploy, browserSync.stream({match: '**/*.css'})))
		.pipe(gulp.dest('public'))
})

gulp.task('scripts', function () {
	const bundler = browserify({
		entries: ['src/ui/index.js'],
		transform: [babelify],
		debug: !deploy,
		fullPaths: !deploy,
		cache: {},
		packageCache: {},
	})


	const watcher = deploy ? bundler: watchify(bundler)

	const compile = function(bundle) {
		bundle
			.bundle()
			.on('error', function(err) {
				gp.util.log(err.toString())
				deploy ? process.exit(1) : this.emit('end')
			})
			.pipe(source('bundle.js'))
			.pipe(buffer())
			.pipe(gp.if(deploy, gp.uglify()))
			.pipe(gp.if(!deploy, gp.sourcemaps.init({loadMaps: true})))
			.pipe(gp.if(!deploy, gp.sourcemaps.write()))
			.pipe(gulp.dest('public/scripts'))
		return bundle
	}

	watcher.on('update', () => compile(watcher))
	watcher.on('time', (time) => {
		gp.util.log(`[Browserify] Bundled in ${(time/1000).toFixed(2)}s`)
	})

	compile(watcher)
})

gulp.task('default', ['scripts'], function() {

	gulp.watch('src/ui/**/*.scss', ['styles'])

	browserSync.init({
		open: false,
		proxy: 'localhost:8080',
	})
})
