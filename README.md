gulp-javascript-plugin-template
===

JSプラグイン作成用gulpタスク

##usage

init
```
$ git clone git@github.com:isoden/gulp-javascript-plugin-template.git
$ mv gulp-javascript-plugin-template <project_name> && cd $_
$ rm -rf .git/ && npm install
$ $EDITOR src/<PLUGIN>.js
```

if you use a altJS: `false` -> `true`

```coffee
config =
    coffee: false
    ts: false
```

develop
```
$ gulp watch
```
`run tasks: ['jshint']`

build
```
$ gulp build
```
`run tasks: ['header', 'rename', 'uglify']`
