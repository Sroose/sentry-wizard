"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var glob = require('glob');
var IGNORE_PATTERN = ['node_modules/**', 'ios/Pods/**', '**/Pods/**'];
function patchMatchingFile(globPattern, func) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    var matches = glob.sync(globPattern, {
        ignore: IGNORE_PATTERN,
    });
    var rv = Promise.resolve();
    matches.forEach(function (match) {
        var contents = fs.readFileSync(match, {
            encoding: 'utf-8',
        });
        rv = rv.then(function () { return func.apply(void 0, __spreadArrays([contents, match], args)); }).then(function (newContents) {
            if (newContents !== null &&
                contents !== undefined &&
                contents !== newContents) {
                fs.writeFileSync(match, newContents);
            }
        });
    });
    return rv;
}
exports.patchMatchingFile = patchMatchingFile;
function exists(globPattern) {
    var matches = glob.sync(globPattern, {
        ignore: IGNORE_PATTERN,
    });
    if (matches.length === 0) {
        return false;
    }
    return matches.reduce(function (prev, match) {
        return prev && fs.existsSync(match);
    }, true);
}
exports.exists = exists;
function matchesContent(globPattern, contentPattern) {
    var matches = glob.sync(globPattern, {
        ignore: IGNORE_PATTERN,
    });
    if (matches.length === 0) {
        return false;
    }
    return matches.reduce(function (prev, match) {
        return (prev &&
            fs
                .readFileSync(match)
                .toString()
                .match(contentPattern));
    }, true);
}
exports.matchesContent = matchesContent;
//# sourceMappingURL=File.js.map