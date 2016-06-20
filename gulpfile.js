////////////////////////////////////////////////////////////////////////////////
// Gulp modules.
////////////////////////////////////////////////////////////////////////////////
var gulp = require("gulp");
var sass = require("gulp-sass");
var webserver = require('gulp-webserver');

////////////////////////////////////////////////////////////////////////////////
// Paths
////////////////////////////////////////////////////////////////////////////////
var srcPath = "source/";
var destPath = "build/";
var modulesPath = "node_modules/";

////////////////////////////////////////////////////////////////////////////////
// Tasks
////////////////////////////////////////////////////////////////////////////////

// Move images.
gulp.task("images", function() {
  gulp.src(srcPath + "images/**/*")
    .pipe(gulp.dest(destPath + "images/"));
});

// Move JavaScript.
gulp.task("javascript", function() {
  gulp.src(srcPath + "javascript/**/*.js")
    .pipe(gulp.dest(destPath + "javascript"));
});

// Compile and move .scss.
gulp.task("stylesheets", function() {
  gulp.src(srcPath + "stylesheets/*.scss")
    .pipe(sass())
    .pipe(gulp.dest(destPath + "stylesheets"));
});

// Move HTML files.
gulp.task("html", function() {
  gulp.src(srcPath + "*.html")
    .pipe(gulp.dest(destPath));
});

// Move Components.
gulp.task("components", function() {

  // jQuery.
  gulp.src(modulesPath + "jquery/dist/jquery.js")
    .pipe(gulp.dest(destPath + "components/jquery/"));

});

// Webserver.
gulp.task("webserver", function() {
  gulp.src(destPath)
    .pipe(webserver({
      fallback: "index.html",
      livereload: true,
      directoryListing: false,
      open: true
    }));
});

////////////////////////////////////////////////////////////////////////////////
// Watch Tasks.
////////////////////////////////////////////////////////////////////////////////

gulp.task("watch", function() {
  gulp.watch(srcPath + "images/**/*", ["images"]); // Images.
  gulp.watch(srcPath + "javascript/**/*.js", ["javascript"]); // JavaScript.
  gulp.watch(srcPath + "stylesheets/**/_*.scss", ["stylesheets"]); // SASS Partials.
  gulp.watch(srcPath + "stylesheets/**/*.scss", ["stylesheets"]); // SASS Main.
  gulp.watch(srcPath + "*.html", ["html"]); // HTML files.
});

////////////////////////////////////////////////////////////////////////////////
// Default Task.
////////////////////////////////////////////////////////////////////////////////
gulp.task("default", ["images", "javascript", "stylesheets", "html", "components", "webserver"]);
