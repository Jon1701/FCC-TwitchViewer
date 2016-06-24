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

// Move fonts.
gulp.task("fonts", function() {
  gulp.src(srcPath + "fonts/**/*")
    .pipe(gulp.dest(destPath + "fonts/"));
})

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

  // React.
  gulp.src(modulesPath + "react/dist/react.js")
    .pipe(gulp.dest(destPath + "components/react/"));

  // React-DOM.
  gulp.src(modulesPath + "react-dom/dist/react-dom.js")
    .pipe(gulp.dest(destPath + "components/react/"));

  // Babel.
  gulp.src(srcPath + "components/react/babel.js")
    .pipe(gulp.dest(destPath + "components/react/"));

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
  gulp.watch(srcPath + "fonts/**/*", ["fonts"]); // Fonts.
  gulp.watch(srcPath + "images/**/*", ["images"]); // Images.
  gulp.watch(srcPath + "javascript/**/*.js", ["javascript"]); // JavaScript.
  gulp.watch(srcPath + "stylesheets/**/_*.scss", ["stylesheets"]); // SASS Partials.
  gulp.watch(srcPath + "stylesheets/**/*.scss", ["stylesheets"]); // SASS Main.
  gulp.watch(srcPath + "*.html", ["html"]); // HTML files.
});

////////////////////////////////////////////////////////////////////////////////
// Default Task.
////////////////////////////////////////////////////////////////////////////////
gulp.task("default", ["fonts", "images", "javascript", "stylesheets", "html", "components", "webserver", "watch"]);
