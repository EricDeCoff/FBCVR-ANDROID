function DirectoryReader(e){this.localURL=e||null,this.hasReadEntries=!1}var exec=require("cordova/exec"),FileError=require("./FileError");DirectoryReader.prototype.readEntries=function(e,r){if(this.hasReadEntries)return void e([]);var i=this,t="function"!=typeof e?null:function(r){for(var t=[],n=0;n<r.length;n++){var l=null;r[n].isDirectory?l=new(require("./DirectoryEntry")):r[n].isFile&&(l=new(require("./FileEntry"))),l.isDirectory=r[n].isDirectory,l.isFile=r[n].isFile,l.name=r[n].name,l.fullPath=r[n].fullPath,l.filesystem=new(require("./FileSystem"))(r[n].filesystemName),l.nativeURL=r[n].nativeURL,t.push(l)}i.hasReadEntries=!0,e(t)},n="function"!=typeof r?null:function(e){r(new FileError(e))};exec(t,n,"File","readEntries",[this.localURL])},module.exports=DirectoryReader;