var gulp = require("gulp");
var glob = require("glob")
var path = require('path');
var jsonfile = require('jsonfile')
var env = 'development';
if (process.argv[3] === '--prod') {
	env = 'production';
}
console.log("Env : -> " + env);

var scriptsArr = [];
var cssArr = [];
gulp.task('build', function () {
	// var task1 =   gulp.src(['./dist/index.html'])
	// .pipe(gulp.dest('../templates/'));
	glob.sync("../static/*.js")
		.forEach(function (file) {
			var filename = path.basename(file, path.extname(file))
			scriptsArr.push(filename + ".js");
		});
	console.log(scriptsArr)
	glob.sync("../static/*.css")
		.forEach(function (file) {
			var filename = path.basename(file, path.extname(file))
			cssArr.push(filename + ".css");
		});
	console.log(cssArr)
	const file = './angular-manifest.json'
	const obj = { scripts: scriptsArr, css: cssArr }

	jsonfile.writeFile(file, obj)
		.then(res => {
			console.log('Write complete')
		})
		.catch(error => console.error(error))
});
