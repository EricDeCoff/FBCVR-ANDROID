var resolve=cordova.require("org.apache.cordova.file.resolveLocalFileSystemURIProxy");module.exports=function(o,e,r){var a=0===r[0]?"temporary":"persistent",l=r[1],v=function(e){var r={name:a,root:e};o(r)};resolve(v,e,["cdvfile://localhost/"+a+"/",void 0,l])};