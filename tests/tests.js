const test = require('tape');
const fs = require('fs');
const sassPack = require('../index.js');

const path = require('path');
const outputPath = path.join('tests', 'outputs');
const themePath = path.join('tests', '*.scss');
const manifestPath = path.join(outputPath, 'cssmanifest.json');

test('Test Compile Without Manifest', function (t) {
	sassPack({
		t: themePath,
		o: outputPath
	}).then(() => {
		fs.readdir(outputPath, (err, files) => {
			if (err) {
				throw err;
			}

			t.ok(files.includes('default.css'), 'Default CSS Created');
			fs.readFile(path.join(outputPath, files[files.indexOf('default.css')]), {
				encoding: 'utf8'
			}, (readErr, data) => {
				t.ok(data.includes('body .test_class'), 'Contains compiled CSS');
				t.end(readErr);
			});
		});
	})
		.catch(err => {
			t.end(err);
		});
});

test('Test Compile With Manifest', function (t) {
	sassPack({
		t: themePath,
		o: outputPath,
		m: manifestPath
	}).then(() => {
		fs.readdir(outputPath, (err, files) => {
			if (err) {
				throw err;
			}
			t.ok(files.includes('default.css'), 'Default CSS Created');
			t.ok(files.includes('cssmanifest.json'), 'Manifest Created');
			fs.readFile(path.join(outputPath, 'cssmanifest.json'), {
				encoding: 'utf8'
			}, (readErr, data) => {
				let results = JSON.parse(data);

				t.ok(results.default, 'Manifest contains path to default theme');
				t.end(readErr);
			});
		});
	});
});

test('Test Compile With Source Sass', function (t) {
	sassPack({
		t: themePath,
		o: outputPath,
		m: manifestPath,
		s: path.join('tests', 'srcTest', '*.scss')
	}).then(() => {
		fs.readdir(outputPath, (err, files) => {
			if (err) {
				throw err;
			}

			t.ok(files.includes('default.css'), 'Default CSS Created');
			t.ok(files.includes('test_home.css'), 'Source CSS Created');
			t.ok(files.includes('cssmanifest.json'), 'Manifest Created');
			fs.readFile(path.join(outputPath, files[0]), {
				encoding: 'utf8'
			}, (readErr, data) => {
				let results = JSON.parse(data);

				t.ok(results.default, 'Manifest contains path to default theme');
				t.ok(results.test_home, 'Manifest contains path to source css');
				t.end(readErr);
			});
		});
	});
});
