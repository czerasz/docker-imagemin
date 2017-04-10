#!/usr/bin/env node

const fs = require('fs');
const glob = require('glob')
const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
const imageminGifsicle = require('imagemin-gifsicle');
const imageminSvgo = require('imagemin-svgo');

if (typeof(process.env.SRC_DIR) === 'undefined' || process.env.SRC_DIR === '') {
	console.error('SRC_DIR environment variable not defined');
	process.exit(1);
}

const globOptions = {
	cwd: process.env.SRC_DIR,
	absolute: true
}

glob('**/*.{jpg,png,gif,svg}', globOptions, (err, files) => {
	if (err) {
		console.error(err);
		process.exit(1);
	}

	console.log('Optimize images:');
	console.log('- ' + files.join("\n- "));

	imagemin(files, {
		use: [
			imageminJpegtran(),
			imageminPngquant({quality: '65-80'}),
			imageminGifsicle(),
			imageminSvgo({
          plugins: [
              {removeViewBox: false}
          ]
      })
		]
	}).then(optimizedFiles => {
		for (var i = 0; i < files.length; i++) {
			fs.writeFile(files[i], optimizedFiles[i].data, (err) => {
				if (err) {
					console.error(err);
				}
			});
		}
	});
})
