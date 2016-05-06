var gulp = require('gulp')
	, browserify = require('browserify')
	, babelify = require('babelify')
	, source = require('vinyl-source-stream')
	, buffer = require('vinyl-buffer')
	, watchify = require('watchify')
	, browserSync = require('browser-sync').create()
	, gp = require('gulp-load-plugins')()

let deploy = false

gulp.task('scripts', function () {
	const bundler = browserify({
		entries: ['src/ui/index.js'],
		transform: [babelify],
		debug: !deploy,
		fullPaths: !deploy,
		cache: {},
		packageCache: {}
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

gulp.task('default', ['scripts'], function(callback) {
	browserSync.init({
		open: false,
		// proxy: 'twopax-restaurant.dev',
	})
})
