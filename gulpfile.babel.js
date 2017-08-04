var gulp = require('gulp');
var requireDir = require('require-dir');

gulp.task('default', ['all-css', 'jshint', 'jsbuild', 'watch', 'server']);

requireDir('./gulp/tasks', { recurse: true });

/*
// TEST BABEL
import {TapeMachine} from "./test";
const tp = new TapeMachine();
tp.record("Hello... Hellooooo!!! Helloooooo!!!!!");
console.log(tp.play());
*/
