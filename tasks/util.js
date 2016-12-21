'use strict'

const gulp = require('gulp');
const jetpack = require('fs-jetpack');
const zipFolder = require('zip-folder');
const tmp = require('tmp');
const dateFormat = require('dateformat');

module.exports = (data)=>{
    
    gulp.task('save', cb => {
        const tmpDir = jetpack.cwd(tmp.dirSync().name);
        data.projectDir.copy('.', tmpDir.path('.'), {
            overwrite: true,
            matching: [
                '!dist',
                '!./dist/**/*',
                '!build',
                '!./build/**/*',
                '!node_modules',
                '!./node_modules/**/*',
                '!./**/*/node_modules/**/*',
                '!\.git',
                '!./\.git/**/*',
                '!./**/*/\.git/**/*'
            ]
        });
        const destFileName = data.projectDir.inspect('.').name + '_' + dateFormat(new Date(), 'dd-mm-yyyy_hh-MM-ss') + '.zip';
        zipFolder(tmpDir.path('.'), data.projectDir.path('../'+destFileName), err => {
            if(err) process.exit('Error saving!');
            else tmpDir.remove();
            cb();
        });
    });
   
}


