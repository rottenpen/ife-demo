"use strict";
var system = require('system');
var keyarg = [];
var keyword = '';
var len = system.args.length;
if (len === 1) {
    console.log('Try to pass some args when invoking this script!');
} else {
    keyarg = system.args.splice(1, len - 1);
    keyword = keyarg.join('');
    console.log(keyword);
}
phantom.exit();