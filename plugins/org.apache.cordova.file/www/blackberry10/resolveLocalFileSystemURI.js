function resolveFile(e,o,r,i){var t=r.substring(7);resolve(e,o,t,window.PERSISTENT,UNSANDBOXED,i)}function resolveCdvFile(e,o,r,i,t){var n=/cdvfile:\/\/localhost\/([^\/]+)\/(.*)/.exec(r),l=n[1],a=n[2];"persistent"===l?resolve(e,o,a,window.PERSISTENT,SANDBOXED,i,t):"temporary"===l?resolve(e,o,a,window.TEMPORARY,SANDBOXED,i,t):"root"===l?resolve(e,o,a,window.PERSISTENT,UNSANDBOXED,i):o(FileError.NOT_FOUND_ERR)}function resolveLocal(e,o,r,i){var t=localPath+r.substring(8);resolve(e,o,t,window.PERSISTENT,UNSANDBOXED,i)}function resolve(e,o,r,i,t,n,l){n=n||{create:!1},l=l||info.MAX_SIZE,l>info.MAX_SIZE?o(FileError.QUOTA_EXCEEDED_ERR):r.indexOf(":")>-1?o(FileError.ENCODING_ERR):requestAnimationFrame(function(){cordova.exec(function(){requestAnimationFrame(function(){resolveNative(e,o,r,i,n,l)})},o,"File","setSandbox",[t],!1)})}function resolveNative(e,o,r,i,t,n){window.webkitRequestFileSystem(i,n,function(i){""===r?e(createEntryFromNative(i.root)):i.root.getFile(r,t,function(o){e(createEntryFromNative(o))},function(n){i.root.getDirectory(r,t,function(o){e(createEntryFromNative(o))},function(){o(n.code===FileError.INVALID_MODIFICATION_ERR&&t.exclusive?FileError.PATH_EXISTS_ERR:FileError.NOT_FOUND_ERR)})})})}var info=require("org.apache.cordova.file.bb10FileSystemInfo"),requestAnimationFrame=cordova.require("org.apache.cordova.file.bb10RequestAnimationFrame"),createEntryFromNative=require("org.apache.cordova.file.bb10CreateEntryFromNative"),SANDBOXED=!0,UNSANDBOXED=!1;module.exports=function(e,o,r){var i=r[0],t=r[1],n=r[2];i?(i=decodeURIComponent(i),i.indexOf("?")>-1&&(i=i.substring(0,i.indexOf("?"))),0===i.indexOf("file://localhost/")&&(i=i.replace("file://localhost/","file:///")),i=i.replace(info.persistentPath,"cdvfile://localhost/persistent"),i=i.replace(info.temporaryPath,"cdvfile://localhost/temporary"),0===i.indexOf("file:///")?resolveFile(e,o,i,t):0===i.indexOf("cdvfile://localhost/")?resolveCdvFile(e,o,i,t,n):0===i.indexOf("local:///")?resolveLocal(e,o,i,t):o(FileError.ENCODING_ERR)):o(FileError.NOT_FOUND_ERR)};