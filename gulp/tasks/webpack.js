import gulp from 'gulp';
import gulpWebpack from 'webpack-stream';
import webpack from 'webpack';
import config from '../config';

let app = './src/main.js';

gulp.task('webpack', () => {
  return gulp.src(app)
    .pipe(gulpWebpack({
      output: {
        filename: config.mainFile + '.js'
      },
      devtool: 'inline-source-map',
      plugins: [
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.DedupePlugin()
      ],
      module: {
        loaders: [
          {
            loaders: ['ng-annotate', 'babel-loader']
          }
        ]
      }
    }, webpack, () => 'done'))
    .pipe(gulp.dest(config.destFolder));
});

gulp.task('webpack-build', () => {
  return gulp.src(app)
    .pipe(gulpWebpack({
      output: {
        filename: config.mainFile + '.js'
      },
      plugins: [
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
          mangle: {
            except: ['goog', 'gapi', 'angular']
          }
        })
      ],
      module: {
        loaders: [
          {
            loaders: ['ng-annotate', 'babel-loader']
          }
        ]
      }
    }, webpack, () => 'done'))
    .pipe(gulp.dest(config.destFolder));
});
