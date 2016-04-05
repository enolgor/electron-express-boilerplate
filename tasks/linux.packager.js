'use strict'

const gulp = require('gulp');
const runSequence = require('run-sequence');
const deb = require("gulp-deb");

let data;


function debProperties(dist){
  const prop = {};
  prop.name = data.manifest.name;
  prop.version = data.manifest.buildProperties.version;
  prop.maintainer = {};
  prop.maintainer.name = data.manifest.author.name;
  prop.maintainer.email = data.manifest.author.email;
  prop.architecture = dist.inspect('.').name.indexOf('64')>-1?'amd64':'i386';
  prop.installedSize = (dist.inspectTree('.').size/1024);
  prop.preDepends = ['dpkg (>= 1.15.6)'];
  prop.depends = null;
  prop.recommends = null;
  prop.suggests = null;
  prop.enhances = null;
  prop.section = data.manifest.buildProperties.section;
  prop.priority = "optional";
  prop.homepage = data.manifest.homepage;
  prop.short_description = data.manifest.description;
  prop.long_description = data.manifest.description;
  return prop;
}

gulp.task('package-linux', cb=>{
  console.log("what");
  let distDir = data.distDir.cwd('./linux');
  const dists = distDir.inspectTree('.').children.filter(child=>child.type==='dir').map(child=>distDir.cwd(child.name));
  dists.forEach(dist=>gulp.src(dist.path('.')+'/**/*').pipe(deb(dist.inspect('.').name+'-setup.deb', debProperties(dist))).pipe(gulp.dest(distDir.path('.'))));
  cb();
});
gulp.task('release-linux', cb=>runSequence('dist-linux', 'package-linux', cb));

module.exports = (_data) => {data = _data; };
