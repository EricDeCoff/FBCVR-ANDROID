var resolve=cordova.require("org.apache.cordova.file.resolveLocalFileSystemURIProxy"),requestAnimationFrame=cordova.require("org.apache.cordova.file.bb10RequestAnimationFrame");module.exports=function(e,r,o){var n=o[0],a=o[2],i=o[3],t=function(r){"function"==typeof e&&e(r)},u=function(e){"function"==typeof r&&r(e&&e.code?e.code:e)};resolve(function(e){requestAnimationFrame(function(){e.nativeEntry.file(function(e){var r=(new FileReader)._realReader;r.onloadend=function(){var e=new Uint8Array(this.result).subarray(a,i),r=new Blob([e]),o=(new FileReader)._realReader;o.onloadend=function(){t(this.result)},o.onerror=u,o.readAsText(r)},r.onerror=u,r.readAsArrayBuffer(e)},u)})},r,[n])};