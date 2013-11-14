# grunt-consolidate

  Use [Consolidate.js](https://github.com/visionmedia/consolidate.js/) for templating of files in your Grunt projects.
  Very useful for preprocessing (build specific file content, such as: LiveReload snippet, non minified assets), 
  and keeping things dry in HTML, JS etc.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-consolidate --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-consolidate');
```

## The "consolidate" task

### Overview
In your project's Gruntfile, add a section named `consolidate` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  consolidate: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### options.engine
Type: `String`
Default value: `null`

The name of the engine used to template your files, you should have the
engine in your node_modules, so make sure it is installed before defining the engine,
uses consolidate.js underhood.

Check [Consolidate.js](https://github.com/visionmedia/consolidate.js/) for more information.

#### options.locals
Type: `Object`
Default value: `{}`

Passed through to the actual template engine, for example, if you use Dust.js as template
engine for Consolidate, than this is passed raw as argument to render the template.


### Usage Examples

#### Dust.js in src dir
In this example, we are using [Dust.js](https://github.com/linkedin/dustjs).
As you can see, the local option is an object that is passed in to all templates,
you could define your helpers, view logic here.

```js
grunt.initConfig({
  consolidate: {
    options: {

      // dust, handlebars, haml, swig and way more ... https://github.com/linkedin/dustjs
      engine: 'dust'
    },
    dev: {
      options: {

        // Data, helpers, partials etc.
        local: {
          users: [{
            name: 'tom',
            email: 'tom@mail.com',
            password: 'computer1'
          }, {
            name: 'rick',
            email: 'rick@mail.com',
            password: 'secret1'
          }]
        }
      },
      files: [{
        expand: true,
        cwd: 'src/',

        // All directories & subdirectories, files that have ".dust.html" in their
        // file extension.
        src: ['{,*/}*.dust.html'],
        dest: 'dist/',
        ext: '.html',

        // Ignore files with "_" prefix, so "partials/_html-doc.html.dust"
        // would be ignored.
        filter: function(srcFile) {
          return !/\/_/.test(srcFile);
        }
      }]
    }
  }
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).