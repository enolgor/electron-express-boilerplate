'use strict'

const gulp = require('gulp');
const runSequence = require('run-sequence');
const childProcess = require("child_process");
const electron = require('electron');


module.exports = (data)=>{
    
    gulp.task('clean', () => data.buildDir.dir('.', {empty: true}));

    gulp.task('build', ['clean'], ()=>{
        data.projectDir.copy(data.srcDir.path('.'), data.buildDir.path('.'), {
            overwrite: true,
           // matching: ['./node_modules/**/*', data.srcDir.dir('static').inspect('.').name+'/**/*', data.manifest.main, 'package.json']
        });
    });    

    gulp.task('run', ['build'], ()=>{
        childProcess.spawn(electron, [data.buildDir.path('.'), 'dev'], {stdio: 'inherit'}).on('close', process.exit);
    });
}


