var resolve=cordova.require("org.apache.cordova.file.resolveLocalFileSystemURIProxy"),requestAnimationFrame=cordova.require("org.apache.cordova.file.bb10RequestAnimationFrame");module.exports=function(e,o,r){var n=r[0],a=function(o){"function"==typeof e&&e(o)},i=function(e){"function"==typeof o&&o(e&&e.code?e.code:e)};resolve(function(e){requestAnimationFrame(function(){e.nativeEntry.file(function(e){var o=(new FileReader)._realReader;o.onloadend=function(){a(this.result)},o.onerror=i,o.readAsDataURL(e)},i)})},o,[n])};