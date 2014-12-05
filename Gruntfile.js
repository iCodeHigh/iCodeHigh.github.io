module.exports = function(grunt) {

	var tsPatterns = ["ts/**/*.ts"];

	// To delete files from directories
	grunt.loadNpmTasks("grunt-contrib-clean");

	// Grunt TypeScript
	grunt.loadNpmTasks("grunt-ts");

	// To watch any file changes
	grunt.loadNpmTasks("grunt-contrib-watch");

	// To compile less into css
	grunt.loadNpmTasks("grunt-contrib-less");

	// creates a connection for testing
	grunt.loadNpmTasks('grunt-contrib-connect');

	// Minifies the files
	grunt.loadNpmTasks("grunt-contrib-uglify");

	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		clean: {
			js: ["js"]
		},
		connect: {
			server: {
				options: {
					// For mobile testing. Change to your private IP.
					hostname: "10.10.10.79",
					port: 8080,
					base: "."
				}
			}
		},
		ts: {
			all: {
				src: tsPatterns,
				out: "js/main.js",
				//outDir: "js",
				options: {
					target: "es5",
					sourceMap: false
				}
			}
		},
		uglify: {
			all: {
				files: [
					{
						expand: true,
						cwd: "js",
						src: ["**/*.js"],
						dest: "js"
					}
				]
			}
		},
		less: {
			all: {
				files: [
					{
						cwd: "css",
						expand: true,
						src: ["**/styles.less"],
						dest: "css",
						ext: ".css"
					}
				],
				options: {
					compress: true
				}
			}
		},
		watch: {
			less: {
				files: ["css/**.less"],
				tasks: ["less"],
				options: {
					nospawn: true
				}
			},
			ts: {
				files: tsPatterns,
				tasks: ["ts"],
				options: {
					nospawn: true
				}
			}
		}
	});

	// Development grunt task
	grunt.registerTask("default", ["less", "ts", "connect", "watch"]);
	grunt.registerTask("deploy", ["less", "ts", "uglify"]);
};