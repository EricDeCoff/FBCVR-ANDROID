var resolve=cordova.require("org.apache.cordova.file.resolveLocalFileSystemURIProxy"),requestAnimationFrame=cordova.require("org.apache.cordova.file.bb10RequestAnimationFrame");module.exports=function(e,o,r){var i="/"===r[0]?"":r[0],n=r[1],t=r[2],c=function(o){"function"==typeof e&&e(o)},a=function(e){"function"==typeof o&&o(e&&e.code?e.code===FileError.INVALID_MODIFICATION_ERR&&t.exclusive?FileError.PATH_EXISTS_ERR:e.code===FileError.NOT_FOUND_ERR&&n.indexOf(":")>0?FileError.ENCODING_ERR:e.code:e)};resolve(function(e){requestAnimationFrame(function(){e.nativeEntry.getDirectory(n,t,function(){resolve(function(e){c(e)},a,[i+"/"+n])},a)})},a,[i])};