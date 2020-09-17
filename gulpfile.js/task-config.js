module.exports = {
  html        : false,
  images      : true,
  fonts       : true,
  static      : false,
  svgSprite   : true,
  ghPages     : false,
  stylesheets : {
    autoprefixer: {
      browsers: "last 2 versions, > 5% in GB, ie >= 10, Safari >= 8"
    }
  },

  additionalTasks: {
    initialize(gulp, PATH_CONFIG, TASK_CONFIG) {
      gulp.task('anims', function() {
        var path        = require('path')
        var changed     = require('gulp-changed')
        var browserSync       = require('browser-sync')

        var paths = {
          src: path.resolve(process.env.PWD, PATH_CONFIG.src, PATH_CONFIG.anims.src, '**/*.*'),
          dest: path.resolve(process.env.PWD, PATH_CONFIG.dest, PATH_CONFIG.anims.dest)
        }

        return gulp.src([paths.src, , '*!README.md'])
          .pipe(changed(paths.dest)) // Ignore unchanged files
          .pipe(gulp.dest(paths.dest))
          .pipe(browserSync.stream())
      })
    },
    development: {
      prebuild: ['anims'],
      postbuild: null
    },
    production: {
      prebuild: ['anims'],
      postbuild: null
    }
  },

  javascripts: {
    entry: {
      app: ["./app.js"]
    }
  },

  svgSprite: {
    svgstore: {
      inlineSvg: true
    }
  },

  browserSync: {
    proxy: 'http://lawn.test',
    path: 'app/themes/lawn/assets',
    files: ['themes/lawn/assets']
  },

  production: {
    rev: false
  }
}
