var resolve=cordova.require("org.apache.cordova.file.resolveLocalFileSystemURIProxy"),info=require("org.apache.cordova.file.bb10FileSystemInfo"),requestAnimationFrame=cordova.require("org.apache.cordova.file.bb10RequestAnimationFrame"),createEntryFromNative=cordova.require("org.apache.cordova.file.bb10CreateEntryFromNative");module.exports=function(e,o,r){var a=r[0],t=function(o){"function"==typeof e&&e(o)},n=function(e){"function"==typeof o&&o(e.code?e.code:e)};resolve(function(e){requestAnimationFrame(function(){var o=e.nativeEntry.createReader(),r=[],a=function(){o.readEntries(function(e){e.length?(r=r.concat(Array.prototype.slice.call(e||[],0)),a()):t(r.sort().map(createEntryFromNative))},n)};a()})},o,[a])};