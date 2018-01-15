const test = require('tape');
const fs = require('fs');
const sassPack = require('../index.js');

const path = require('path');
const outputPath = path.join('src', 'tests', 'outputs', 'small');
const themePath = path.join('src', 'tests', 'default.scss');
const bsTheme = path.join('src', 'tests', 'bootstrap.scss');
const aliasTheme = path.join('src', 'tests', 'test.scss');
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
    alias: 'src/tests'
  }).then(() => {
    setTimeout(() => {
      fs.readdir(outputPath, (err, files) => {
        if (err) {
          throw err;
        }

        t.ok(files.includes('test.min.css'), 'Bootstrap CSS Created');
        t.end();
      });
    }, 10);
  });
});

test('Test external creation', t => {
  sassPack({
    source: aliasTheme,
    output: path.join('src', 'tests', 'outputs', 'external'),
    minify: 'compressed',
    alias: 'src/tests',
    external: path.join('src', 'tests', 'external.scss')
  }).then(() => {
    fs.readdir(path.join('src', 'tests', 'outputs', 'external'), (err, files) => {
      if (err) {
        throw err;
      }

      t.ok(files.includes('test.min.css'), 'Main CSS compiled and created');
      t.ok(files.includes('external.min.css'), 'External CSS compiled and created');
      t.end();
    });
  });
});

test('Test Folders boolean usage', t => {
  sassPack({
    source: path.join('src', 'tests', 'srcTest', 'test_home.scss'),
    output: path.join('src', 'tests', 'outputs', 'folders'),
    minify: 'compressed',
    alias: 'src/tests',
    folders: true
  }).then(() => {
    setTimeout(() => {
      fs.readdir(path.join('src', 'tests', 'outputs', 'folders'), (err, files) => {
        if (err) {
          throw err;
        }

        t.ok(files.includes('srcTest.min.css'), 'Main CSS compiled and created');
        t.end();
      });
    }, 100);
  });
});

test('Test Multi-Level Compile', t => {
  sassPack({
    source: path.join('src', 'tests', 'multi-level', 'themes', '!(framework)', '!(*-email).scss'),
    output: path.join('src', 'tests', 'outputs', 'multi'),
    minify: 'compressed',
    alias: 'src/tests/multi-level',
    manifest: path.join('src', 'tests', 'outputs', 'multi', 'sourcemap.json'),
    folders: true
  }).then(() => {
    setTimeout(() => {
      fs.readdir(path.join('src', 'tests', 'outputs', 'multi'), (err, files) => {
        if (err) {
          throw err;
        }

        t.ok(files.includes('default.min.css'), 'Main CSS compiled and created');
        t.ok(files.includes('vol.min.css'), 'Vol CSS compiled and created');
        t.ok(files.includes('vwn.min.css'), 'Vwn CSS compiled and created');
        t.end();
      });
    }, 10);
  });
});

