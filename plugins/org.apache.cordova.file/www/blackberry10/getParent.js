var resolve=cordova.require("org.apache.cordova.file.resolveLocalFileSystemURIProxy"),requestAnimationFrame=cordova.require("org.apache.cordova.file.bb10RequestAnimationFrame");module.exports=function(e,o,r){var n=r[0],t=function(o){"function"==typeof e&&e(o)},a=function(e){"function"==typeof o&&o(e&&e.code?e.code:e)};resolve(function(e){requestAnimationFrame(function(){e.nativeEntry.getParent(t,a)})},a,[n])};