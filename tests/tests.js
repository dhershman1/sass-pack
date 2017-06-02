const test = require('tape');
const fs = require('fs');
const sassPack = require('../index.js');

const path = require('path');
const outputPath = path.join('tests', 'outputs');
const themePath = path.join('tests', 'default.scss');
const bsTheme = path.join('tests', 'bootstrap.scss');
const manifestPath = path.join(outputPath, 'cssmanifest.json');

test('Test Compile Without Manifest', t => {
	sassPack({
		t: themePath,
		o: outputPath,
		minify: 0
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

test('Test Compile With Manifest', t => {
	sassPack({
		t: themePath,
		o: outputPath,
		m: manifestPath,
		minify: 0
	}).then(() => {
		fs.readdir(outputPath, (err, files) => {
			if (err) {
				throw err;
			}
			t.ok(files.includes('default.css'), 'Default CSS Created');
			t.ok(files.includes('cssmanifest.json'), 'Manifest Created');
			fs.readFile(manifestPath, {
				encoding: 'utf8'
			}, (readErr, data) => {
				let results = JSON.parse(data);

				t.ok(results.default, 'Manifest contains path to default theme');
				t.end(readErr);
			});
		});
	});
});

test('Test Compile With Source Sass', t => {
	sassPack({
		t: themePath,
		o: outputPath,
		m: manifestPath,
		s: path.join('tests', 'srcTest', '*.scss'),
		minify: 0
	}).then(() => {
		fs.readdir(outputPath, (err, files) => {
			if (err) {
				throw err;
			}

			t.ok(files.includes('default.css'), 'Default CSS Created');
			t.ok(files.includes('test_home.css'), 'Source CSS Created');
			t.ok(files.includes('cssmanifest.json'), 'Manifest Created');
			fs.readFile(manifestPath, {
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

test('Test Compile bootstrap and minify', t => {
	sassPack({
		theme: bsTheme,
		output: outputPath,
		manifest: manifestPath,
		minify: 'compressed'
	}).then(() => {
		fs.readdir(outputPath, (err, files) => {
			if (err) {
				throw err;
			}
			t.ok(files.includes('bootstrap.min.css'), 'Bootstrap CSS Created');
			t.ok(files.includes('cssmanifest.json'), 'Manifest Created');
			fs.readFile(manifestPath, {
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

test('Test Compile bootstrap minify & sourcemap', t => {
	sassPack({
		theme: themePath,
		output: outputPath,
		manifest: manifestPath,
		minify: 'compressed',
		sourcemaps: outputPath
	}).then(() => {
		fs.readdir(outputPath, (err, files) => {
			if (err) {
				throw err;
			}
			t.ok(files.includes('bootstrap.min.css'), 'Bootstrap CSS Created');
			t.ok(files.includes('cssmanifest.json'), 'Manifest Created');
			fs.readFile(manifestPath, {
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
