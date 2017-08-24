const test = require('tape');
const fs = require('fs');
const sassPack = require('../index.js');

const path = require('path');
const outputPath = path.join('tests', 'outputs');
const themePath = path.join('tests', 'default.scss');
const bsTheme = path.join('tests', 'bootstrap.scss');
const aliasTheme = path.join('tests', 'test.scss');
const manifestPath = path.join(outputPath, 'cssmanifest.json');

test('Test Compile Without Manifest', t => {
	sassPack({
		source: themePath,
		output: outputPath
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
		source: themePath,
		output: outputPath,
		manifest: manifestPath
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
				const results = JSON.parse(data);

				t.ok(results.default, 'Manifest contains path to default theme');
				t.end(readErr);
			});
		});
	});
});

test('Test Compile With multi paths', t => {
	sassPack({
		source: `${themePath},${bsTheme}`,
		output: outputPath,
		manifest: path.join(outputPath, 'multimanifest.json')
	}).then(() => {
		fs.readdir(outputPath, (err, files) => {
			if (err) {
				throw err;
			}

			t.ok(files.includes('default.css'), 'Default CSS Created');
			t.ok(files.includes('multimanifest.json'), 'Manifest Created');
			fs.readFile(path.join(outputPath, 'multimanifest.json'), {
				encoding: 'utf8'
			}, (readErr, data) => {
				const results = JSON.parse(data);

				t.ok(results.default, 'Manifest contains path to default theme');
				t.ok(results.bootstrap, 'Manifest contains path to bootstrap theme');
				t.end(readErr);
			});
		});
	});
});

test('Test Compile bootstrap and minify', t => {
	sassPack({
		source: bsTheme,
		output: outputPath,
		manifest: path.join(outputPath, 'bootstrapmanifest.json'),
		minify: 'compressed'
	}).then(() => {
		fs.readdir(outputPath, (err, files) => {
			if (err) {
				throw err;
			}
			t.ok(files.includes('bootstrap.min.css'), 'Bootstrap CSS Created');
			t.ok(files.includes('bootstrapmanifest.json'), 'Manifest Created');
			fs.readFile(path.join(outputPath, 'bootstrapmanifest.json'), {
				encoding: 'utf8'
			}, (readErr, data) => {
				const results = JSON.parse(data);

				t.ok(results.bootstrap, 'Manifest contains path to bootstrap css');
				t.end(readErr);
			});
		});
	});
});

test('Test Compile default theme minify & sourcemap', t => {
	sassPack({
		source: themePath,
		output: outputPath,
		manifest: path.join(outputPath, 'sourcemap.json'),
		minify: 'compressed',
		sourcemaps: outputPath
	}).then(() => {
		fs.readdir(outputPath, (err, files) => {
			if (err) {
				throw err;
			}
			t.ok(files.includes('bootstrap.min.css'), 'Bootstrap CSS Created');
			t.ok(files.includes('sourcemap.json'), 'Manifest Created');
			fs.readFile(path.join(outputPath, 'sourcemap.json'), {
				encoding: 'utf8'
			}, (readErr, data) => {
				const results = JSON.parse(data);

				t.ok(results.default, 'Manifest contains path to default theme');
				t.end(readErr);
			});
		});
	});
});

test('Test alias pathing replacement', t => {
	sassPack({
		source: aliasTheme,
		output: outputPath,
		minify: 'compressed',
		alias: 'tests/srcTest/'
	}).then(() => {
		fs.readdir(outputPath, (err, files) => {
			if (err) {
				throw err;
			}
			t.ok(files.includes('test.min.css'), 'Bootstrap CSS Created');
			t.end();
		});
	});
});
