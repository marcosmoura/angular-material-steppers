import runSequence from 'run-sequence';
import gulp from 'gulp';
import './tasks/clean';
import './tasks/browserify';
import './tasks/sass';
import './tasks/eslint';
import './tasks/watch';

gulp.task('default', () => {
  runSequence('clean', ['browserify', 'eslint-all', 'sass'], 'watch');
});
