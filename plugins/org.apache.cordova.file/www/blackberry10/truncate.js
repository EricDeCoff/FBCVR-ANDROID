var resolve=cordova.require("org.apache.cordova.file.resolveLocalFileSystemURIProxy"),requestAnimationFrame=cordova.require("org.apache.cordova.file.bb10RequestAnimationFrame");module.exports=function(e,r,o){var n=o[0],a=o[1],i=function(r){"function"==typeof e&&e(r.loaded)},t=function(e){"function"==typeof r&&r(e&&e.code?e.code:e)};resolve(function(e){requestAnimationFrame(function(){e.nativeEntry.file(function(r){var o=(new FileReader)._realReader;o.onloadend=function(){var r=new Uint8Array(this.result).subarray(0,a);blob=new Blob([r]),window.requestAnimationFrame(function(){e.nativeEntry.createWriter(function(e){e.onwriteend=i,e.onerror=t,e.write(blob)},t)})},o.onerror=t,o.readAsArrayBuffer(r)},t)})},t,[n])};