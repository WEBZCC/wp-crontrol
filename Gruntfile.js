module.exports = function (grunt) {
	'use strict';

	require('load-grunt-tasks')(grunt);

	var pkg = grunt.file.readJSON('package.json');
	var config = {};

	config.pkg = pkg;

	config['convert-svg-to-png'] = {
		normal: {
			options: {
				size: {
					w: '128px',
					h: '128px'
				}
			},
			files: [
				{
					expand: true,
					src: [
						'.wordpress-org/icon.svg'
					],
					dest: '.wordpress-org/128'
				}
			]
		},
		retina: {
			options: {
				size: {
					w: '256px',
					h: '256px'
				}
			},
			files: [
				{
					src: [
						'.wordpress-org/icon.svg'
					],
					dest: '.wordpress-org/256'
				}
			]
		}
	};

	config.clean = {
		icons: Object.keys(config['convert-svg-to-png']).map(function(key){
			return config['convert-svg-to-png'][ key ].files[0].dest;
		})
	};

	config.rename = {
		icons:{
			expand: true,
			src: [
				'.wordpress-org/*/icon.png'
			],
			rename: function (dest,src) {
				return src.replace(/.wordpress-org\/(\d+)\/icon.png/,'.wordpress-org/icon-$1x$1.png');
			}
		}
	};

	config.version = {
		main: {
			options: {
				prefix: 'Version:[\\s]+'
			},
			src: [
				'<%= pkg.name %>.php'
			]
		},
		readme: {
			options: {
				prefix: 'Stable tag:[\\s]+'
			},
			src: [
				'readme.md'
			]
		},
		pkg: {
			src: [
				'package.json'
			]
		}
	};

	grunt.initConfig(config);

	grunt.registerTask('bump', function(version) {
		if ( ! version ) {
			grunt.fail.fatal( 'No version specified. Usage: bump:major, bump:minor, bump:patch, bump:x.y.z' );
		}

		grunt.task.run([
			'version::' + version
		]);
	});

	grunt.registerTask('icons', [
		'convert-svg-to-png',
		'rename:icons',
		'clean:icons'
	]);
};
