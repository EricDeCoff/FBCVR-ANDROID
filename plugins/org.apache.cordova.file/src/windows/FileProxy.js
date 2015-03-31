function cordovaPathToNative(e){var t=e.replace(/\//g,"\\");return t=t.replace(/\\\\/g,"\\"),t=t.replace(/\\+$/g,"")}function nativePathToCordova(e){var t=e.replace(/\\/g,"/");return t}function getFilesystemFromPath(e){var t=Windows.Storage.ApplicationData.current.localFolder.path,n=Windows.Storage.ApplicationData.current.temporaryFolder.path,r=null;return 0===e.indexOf(t)?r=new FileSystem("persistent",{name:"persistent",fullPath:t}):0===e.indexOf(n)&&(r=new FileSystem("temporary",{name:"temporary",fullPath:n})),r}var cordova=require("cordova"),Entry=require("./Entry"),File=require("./File"),FileEntry=require("./FileEntry"),FileError=require("./FileError"),DirectoryEntry=require("./DirectoryEntry"),Flags=require("./Flags"),FileSystem=require("./FileSystem"),LocalFileSystem=require("./LocalFileSystem"),getFolderFromPathAsync=Windows.Storage.StorageFolder.getFolderFromPathAsync,getFileFromPathAsync=Windows.Storage.StorageFile.getFileFromPathAsync,writeBytesAsync=Windows.Storage.FileIO.writeBytesAsync,writeTextAsync=Windows.Storage.FileIO.writeTextAsync,writeBlobAsync=function(e,t){return e.openAsync(Windows.Storage.FileAccessMode.readWrite).then(function(e){var n=t.size,r=(t.detachStream||t.msDetachStream).call(t);return Windows.Storage.Streams.RandomAccessStream.copyAsync(r,e).then(function(){return e.flushAsync().then(function(){return r.close(),e.close(),n})})})},writeArrayBufferAsync=function(e,t){return writeBlobAsync(e,new Blob([t]))};module.exports={getFileMetadata:function(e,t,n){module.exports.getMetadata(e,t,n)},getMetadata:function(e,t,n){var r=cordovaPathToNative(n[0]),o=function(n){n.getBasicPropertiesAsync().then(function(t){e(new File(n.name,n.path,n.fileType,t.dateModified,t.size))},function(){t(FileError.NOT_READABLE_ERR)})},i=function(n){n.getBasicPropertiesAsync().then(function(t){var n={size:t.size,lastModifiedDate:t.dateModified};e(n)},function(){t(FileError.NOT_READABLE_ERR)})};getFileFromPathAsync(r).then(o,function(){getFolderFromPathAsync(r).then(i,function(){t(FileError.NOT_FOUND_ERR)})})},getParent:function(e,t,n){var r=cordovaPathToNative(n[0]),o=Windows.Storage.ApplicationData.current.localFolder,i=Windows.Storage.ApplicationData.current.temporaryFolder;if(r==o.path)return void e(new DirectoryEntry(o.name,o.path,getFilesystemFromPath(o.path)));if(r==i.path)return void e(new DirectoryEntry(i.name,i.path,getFilesystemFromPath(i.path)));var a=r.split(new RegExp(/\/|\\/g)),c=a.pop(),l=r.substr(0,r.length-c.length-1),s=new DirectoryEntry(c,l,getFilesystemFromPath(l));getFolderFromPathAsync(s.fullPath).done(function(){e(s)},function(){t(FileError.INVALID_STATE_ERR)})},readAsText:function(e,t,n){var r=cordovaPathToNative(n[0]),o=n[1],i=n[2],a=n[3],c=Windows.Storage.Streams.UnicodeEncoding.utf8;"Utf16LE"==o||"utf16LE"==o?c=Windows.Storage.Streams.UnicodeEncoding.utf16LE:("Utf16BE"==o||"utf16BE"==o)&&(c=Windows.Storage.Streams.UnicodeEncoding.utf16BE),getFileFromPathAsync(r).then(function(e){return e.openReadAsync()}).then(function(e){i=0>i?Math.max(e.size+i,0):Math.min(e.size,i),a=0>a?Math.max(a+e.size,0):Math.min(e.size,a),e.seek(i);var t=a-i,n=new Windows.Storage.Streams.Buffer(t);return e.readAsync(n,t,Windows.Storage.Streams.InputStreamOptions.none)}).done(function(t){e(Windows.Security.Cryptography.CryptographicBuffer.convertBinaryToString(c,t))},function(){t(FileError.NOT_FOUND_ERR)})},readAsBinaryString:function(e,t,n){var r=cordovaPathToNative(n[0]),o=n[1],i=n[2];getFileFromPathAsync(r).then(function(t){Windows.Storage.FileIO.readBufferAsync(t).done(function(t){var n=Windows.Storage.Streams.DataReader.fromBuffer(t),r=new Uint8Array(t.length),a="";n.readBytes(r),n.close();for(var c=0;c<r.length;c++){var l=r[c],s=String.fromCharCode(l);a+=s}e(a.slice(o,i))})},function(){t(FileError.NOT_FOUND_ERR)})},readAsArrayBuffer:function(e,t,n){var r=cordovaPathToNative(n[0]);getFileFromPathAsync(r).then(function(t){var r=MSApp.createFileFromStorageFile(t),o=URL.createObjectURL(r,{oneTimeOnly:!0}),i=new XMLHttpRequest;i.open("GET",o,!0),i.responseType="arraybuffer",i.onload=function(){var t=i.response,r=n[1]||0,o=n[2]||t.length;if(0!==r||o!==t.length)if(t.slice)t=t.slice(r,o);else{for(var a=new Uint8Array(t),c=new ArrayBuffer(o-r),l=new Uint8Array(c),s=0;s<l.length;s++)l[s]=a[s+r];t=c}e(t)},i.send()},function(){t(FileError.NOT_FOUND_ERR)})},readAsDataURL:function(e,t,n){var r=cordovaPathToNative(n[0]);getFileFromPathAsync(r).then(function(t){Windows.Storage.FileIO.readBufferAsync(t).done(function(n){var r=Windows.Security.Cryptography.CryptographicBuffer.encodeToBase64String(n);"77u/"==String(r).substr(0,4)&&(r=r.substr(4));var o=t.contentType,i="data:"+o+";base64,"+r;e(i)})},function(){t(FileError.NOT_FOUND_ERR)})},getDirectory:function(e,t,n){var r=cordovaPathToNative(n[0]),o=cordovaPathToNative(n[1]),i=n[2],a="";a=i?new Flags(i.create,i.exclusive):new Flags(!1,!1),getFolderFromPathAsync(r).then(function(n){if(a.create===!0&&a.exclusive===!0)n.createFolderAsync(o,Windows.Storage.CreationCollisionOption.failIfExists).done(function(t){e(new DirectoryEntry(t.name,nativePathToCordova(t.path),getFilesystemFromPath(t.path)))},function(){t(FileError.PATH_EXISTS_ERR)});else if(a.create===!0&&a.exclusive===!1)n.createFolderAsync(o,Windows.Storage.CreationCollisionOption.openIfExists).done(function(t){e(new DirectoryEntry(t.name,t.path+"/",getFilesystemFromPath(t.path+"/")))},function(){t(FileError.INVALID_MODIFICATION_ERR)});else if(a.create===!1){if(/\?|\\|\*|\||\"|<|>|\:|\//g.test(o))return void t(FileError.ENCODING_ERR);n.getFolderAsync(o).done(function(t){e(new DirectoryEntry(t.name,t.path,getFilesystemFromPath(t.path)))},function(){n.getFileAsync(o).done(function(){t(FileError.TYPE_MISMATCH_ERR)},function(){t(FileError.NOT_FOUND_ERR)})})}},function(){t(FileError.NOT_FOUND_ERR)})},remove:function(e,t,n){var r=cordovaPathToNative(n[0]);getFileFromPathAsync(r).then(function(n){n.deleteAsync().done(e,function(){t(FileError.INVALID_MODIFICATION_ERR)})},function(){getFolderFromPathAsync(r).then(function(){var n=function(){var n=null;getFolderFromPathAsync(r).then(function(e){var o=Windows.Storage.ApplicationData.current.localFolder,i=Windows.Storage.ApplicationData.current.temporaryFolder;return r==o.path||r==i.path?void t(FileError.NO_MODIFICATION_ALLOWED_ERR):(n=e,e.getFilesAsync())},function(){t(FileError.INVALID_MODIFICATION_ERR)}).then(function(e){if(e){if(0===e.length)return n.getFoldersAsync();t(FileError.INVALID_MODIFICATION_ERR)}}).then(function(r){r&&(0===r.length?n.deleteAsync().done(e,function(){t(FileError.INVALID_MODIFICATION_ERR)}):t(FileError.INVALID_MODIFICATION_ERR))})};n()},function(){t(FileError.NOT_FOUND_ERR)})})},removeRecursively:function(e,t,n){var r=cordovaPathToNative(n[0]);getFolderFromPathAsync(r).done(function(n){var r=Windows.Storage.ApplicationData.current.localFolder,o=Windows.Storage.ApplicationData.current.temporaryFolder;return n.path==r.path||n.path==o.path?void t(FileError.NO_MODIFICATION_ALLOWED_ERR):void n.deleteAsync().done(function(t){e(t)},function(e){t(e)})},function(){t(FileError.FILE_NOT_FOUND_ERR)})},getFile:function(e,t,n){var r=cordovaPathToNative(n[0]),o=cordovaPathToNative(n[1]),i=n[2],a=r+"\\"+o;a=a.replace(/\\\\\\/g,"/").replace(/\\\\/g,"\\");var c=a.substring(a.lastIndexOf("\\"));r=a.substring(0,a.lastIndexOf("\\")),o=c.replace(/\\/g,"");var l="";l=null!==i?new Flags(i.create,i.exclusive):new Flags(!1,!1),getFolderFromPathAsync(r).then(function(n){if(l.create===!0&&l.exclusive===!0)n.createFileAsync(o,Windows.Storage.CreationCollisionOption.failIfExists).done(function(t){e(new FileEntry(t.name,nativePathToCordova(t.path),getFilesystemFromPath(t.path)))},function(){t(FileError.PATH_EXISTS_ERR)});else if(l.create===!0&&l.exclusive===!1)n.createFileAsync(o,Windows.Storage.CreationCollisionOption.openIfExists).done(function(t){e(new FileEntry(t.name,nativePathToCordova(t.path),getFilesystemFromPath(t.path)))},function(){t(FileError.INVALID_MODIFICATION_ERR)});else if(l.create===!1){if(/\?|\\|\*|\||\"|<|>|\:|\//g.test(o))return void t(FileError.ENCODING_ERR);n.getFileAsync(o).done(function(t){e(new FileEntry(t.name,nativePathToCordova(t.path),getFilesystemFromPath(t.path)))},function(){n.getFolderAsync(o).done(function(){t(FileError.TYPE_MISMATCH_ERR)},function(){t(FileError.NOT_FOUND_ERR)})})}},function(){t(FileError.NOT_FOUND_ERR)})},readEntries:function(e,t,n){var r=cordovaPathToNative(n[0]),o=[];getFolderFromPathAsync(r).then(function(t){var n=[],r=0;n[r++]=t.getFilesAsync().then(function(e){if(null!==e)for(var t=0;t<e.length;t++)o.push(new FileEntry(e[t].name,e[t].path,getFilesystemFromPath(e[t].path)))}),n[r++]=t.getFoldersAsync().then(function(e){if(null!==e)for(var t=0;t<e.length;t++)o.push(new DirectoryEntry(e[t].name,e[t].path,getFilesystemFromPath(e[t].path)))}),WinJS.Promise.join(n).then(function(){e(o)})},function(){t(FileError.NOT_FOUND_ERR)})},write:function(e,t,n){function r(e,t){if(e instanceof Blob)return writeBlobAsync;if(e instanceof ArrayBuffer)return writeArrayBufferAsync;if(t)return writeBytesAsync;if("string"==typeof e)return writeTextAsync;throw new Error("Unsupported data type for write method")}var o=cordovaPathToNative(n[0]),i=n[1],a=(n[2],n[3]);o=o.split("/").join("\\");var c=o.substring(0,o.lastIndexOf("\\")),l=o.split("\\").pop(),s=r(i,a);getFolderFromPathAsync(c).done(function(n){n.createFileAsync(l,Windows.Storage.CreationCollisionOption.openIfExists).done(function(n){s(n,i).done(function(t){var n=t||i.length;e(n)},function(){t(FileError.INVALID_MODIFICATION_ERR)})},function(){t(FileError.INVALID_MODIFICATION_ERR)})},function(){t(FileError.NOT_FOUND_ERR)})},truncate:function(e,t,n){var r=cordovaPathToNative(n[0]),o=n[1];getFileFromPathAsync(r).done(function(n){var r=0;n.getBasicPropertiesAsync().then(function(i){return r=i.size,Number(o)>=r?void e(this.length):void(Number(o)>=0&&Windows.Storage.FileIO.readTextAsync(n,Windows.Storage.Streams.UnicodeEncoding.utf8).then(function(r){r=r.substr(0,o);var i=n.path,a=n.name,c=new Entry(!0,!1,a,i,getFilesystemFromPath(i)),l="",s=function(o){l=o.fullPath,n.deleteAsync().then(function(){return getFolderFromPathAsync(l)}).then(function(n){n.createFileAsync(a).then(function(n){Windows.Storage.FileIO.writeTextAsync(n,r).done(function(){e(String(r).length)},function(){t(FileError.NO_MODIFICATION_ALLOWED_ERR)})},function(){t(FileError.NO_MODIFICATION_ALLOWED_ERR)})})};c.getParent(s,null)},function(){t(FileError.NOT_FOUND_ERR)}))})},function(){t(FileError.NOT_FOUND_ERR)})},copyTo:function(e,t,n){var r=cordovaPathToNative(n[0]),o=cordovaPathToNative(n[1]),i=n[2];if(/\?|\\|\*|\||\"|<|>|\:|\//g.test(i))return void t(FileError.ENCODING_ERR);var a="";getFileFromPathAsync(r).then(function(){a=function(n,r){var o=null;getFileFromPathAsync(n).then(function(e){return o=e,getFolderFromPathAsync(r)},function(){t(FileError.NOT_FOUND_ERR)}).then(function(n){o.copyAsync(n,i,Windows.Storage.NameCollisionOption.failIfExists).then(function(t){e(new FileEntry(t.name,nativePathToCordova(t.path),getFilesystemFromPath(t.path)))},function(){t(FileError.INVALID_MODIFICATION_ERR)})},function(){t(FileError.NOT_FOUND_ERR)})};var n=function(e,t){a(e,t)};n(r,o)},function(){getFolderFromPathAsync(r).then(function(){a=function(e,n){var r=function(e,t){e.getFoldersAsync().then(function(e){var r=[];0===e.length?t():getFolderFromPathAsync(n).then(function(n){for(var o=[],i=0,c=0;c<e.length;c++)o[i++]=n.createFolderAsync(e[c].name).then(function(t){r.push(a(e[c].path,t.path))});WinJS.Promise.join(o).then(function(){WinJS.Promise.join(r).then(t)})})})};return new WinJS.Promise(function(o){var i=null,a=[],c=null;getFolderFromPathAsync(e).then(function(e){return i=e,e.getFilesAsync()}).then(function(e){return c=e,e?getFolderFromPathAsync(n):void 0}).then(function(e){for(var n=0;n<c.length;n++)a.push(c[n].copyAsync(e));WinJS.Promise.join(a).done(function(){r(i,o)},function(){t(FileError.INVALID_MODIFICATION_ERR)})})})};var n=function(n,r){getFolderFromPathAsync(r).then(function(o){o.createFolderAsync(i,Windows.Storage.CreationCollisionOption.openIfExists).then(function(o){return n==o.path?void t(FileError.INVALID_MODIFICATION_ERR):n==r?void t(FileError.INVALID_MODIFICATION_ERR):void a(n,o.path).then(function(){getFolderFromPathAsync(o.path).done(function(t){e(new DirectoryEntry(t.name,nativePathToCordova(t.path),getFilesystemFromPath(t.path)))},function(){t(FileError.NOT_FOUND_ERR)})})},function(){t(FileError.INVALID_MODIFICATION_ERR)})},function(){t(FileError.INVALID_MODIFICATION_ERR)})};n(r,o)},function(){t(FileError.NOT_FOUND_ERR)})})},moveTo:function(e,t,n){var r=cordovaPathToNative(n[0]),o=cordovaPathToNative(n[1]),i=n[2];if(/\?|\\|\*|\||\"|<|>|\:|\//g.test(i))return void t(FileError.ENCODING_ERR);var a="";getFileFromPathAsync(r).then(function(){a=function(n,r){var o=null;getFileFromPathAsync(n).then(function(e){return o=e,getFolderFromPathAsync(r)},function(){t(FileError.NOT_FOUND_ERR)}).then(function(n){o.moveAsync(n,i,Windows.Storage.NameCollisionOption.replaceExisting).then(function(){e(new FileEntry(i,nativePathToCordova(o.path),getFilesystemFromPath(n.path)))},function(){t(FileError.INVALID_MODIFICATION_ERR)})},function(){t(FileError.NOT_FOUND_ERR)})};var n=function(e,n){return e==n+"\\"+i?void t(FileError.INVALID_MODIFICATION_ERR):void a(e,o)};n(r,o)},function(){getFolderFromPathAsync(r).then(function(){a=function(e,t){var n=function(e,n){e.getFoldersAsync().then(function(e){var r=[];0===e.length?n():getFolderFromPathAsync(t).then(function(t){for(var o=[],i=0,c=0;c<e.length;c++)o[i++]=t.createFolderAsync(e[c].name).then(function(t){r.push(a(e[c].path,t.path))});WinJS.Promise.join(o).then(function(){WinJS.Promise.join(r).then(n)})})})};return new WinJS.Promise(function(r){var o=null;getFolderFromPathAsync(e).then(function(e){return o=e,e.getFilesAsync()}).then(function(e){var i=[];getFolderFromPathAsync(t).then(function(t){if(e)for(var a=0;a<e.length;a++)i.push(e[a].moveAsync(t));WinJS.Promise.join(i).then(function(){n(o,r)},function(){})})})})};var n=function(n,r){var o=null;getFolderFromPathAsync(n).then(function(e){return o=e,getFolderFromPathAsync(r)},function(){t(FileError.INVALID_MODIFICATION_ERR)}).then(function(e){return e.createFolderAsync(i,Windows.Storage.CreationCollisionOption.openIfExists)},function(){t(FileError.INVALID_MODIFICATION_ERR)}).then(function(c){c.getFilesAsync().then(function(l){c.getFoldersAsync().then(function(s){return 0!==l.length||0!==s.length?void t(FileError.INVALID_MODIFICATION_ERR):n==c.path?void t(FileError.INVALID_MODIFICATION_ERR):n==r?void t(FileError.INVALID_MODIFICATION_ERR):void a(n,c.path).then(function(){var n=function(){e(new DirectoryEntry(i,nativePathToCordova(c.path),getFilesystemFromPath(c.path)))};o.deleteAsync().done(n,t)},function(){console.log("error!")})})})},function(){t(FileError.INVALID_MODIFICATION_ERR)})};n(r,o)},function(){t(FileError.NOT_FOUND_ERR)})})},tempFileSystem:null,persistentFileSystem:null,requestFileSystem:function(e,t,n){var r=n[0],o=n[1],i="",a=null,c="";switch(r){case LocalFileSystem.TEMPORARY:i=Windows.Storage.ApplicationData.current.temporaryFolder.path,c="temporary";break;case LocalFileSystem.PERSISTENT:i=Windows.Storage.ApplicationData.current.localFolder.path,c="persistent"}var l=1e10;if(o>l)return void t(FileError.QUOTA_EXCEEDED_ERR);var s=new FileSystem(c,new DirectoryEntry(c,nativePathToCordova(i)));a=s,e(a)},resolveLocalFileSystemURI:function(e,t,n){var r=n[0],o=cordovaPathToNative(r);/\?/g.test(o)&&(o=String(o).split("?")[0]),/\%5/g.test(o)&&(o=decodeURI(o));var i="ms-appdata:///local/",a="ms-appdata:///temp/",c=Windows.Storage.ApplicationData.current.localFolder.path+"\\",l=Windows.Storage.ApplicationData.current.temporaryFolder.path+"\\";if(0===r.indexOf("file:///"))o=c+r.substr(8).replace("/","\\");else if(0===r.indexOf(i))o=c+r.replace(i,"").replace("/","\\");else if(0===r.indexOf(a))o=l+r.replace(a,"").replace("/","\\");else if(0!=o.indexOf(l)&&0!=o.indexOf(c))return void t(FileError.NOT_FOUND_ERR);getFileFromPathAsync(o).then(function(t){e(new FileEntry(t.name,nativePathToCordova(t.path),getFilesystemFromPath(t.path)))},function(){getFolderFromPathAsync(o).then(function(t){var n=nativePathToCordova(t.path);e(new DirectoryEntry(t.name,n,getFilesystemFromPath(t.path),n))},function(){t(FileError.NOT_FOUND_ERR)})})}},require("cordova/exec/proxy").add("File",module.exports);