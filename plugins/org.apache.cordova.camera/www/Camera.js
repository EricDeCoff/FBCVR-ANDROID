var argscheck=require("cordova/argscheck"),exec=require("cordova/exec"),Camera=require("./Camera"),cameraExport={};for(var key in Camera)cameraExport[key]=Camera[key];cameraExport.getPicture=function(e,a,r){argscheck.checkArgs("fFO","Camera.getPicture",arguments),r=r||{};var c=argscheck.getValue,t=c(r.quality,50),o=c(r.destinationType,Camera.DestinationType.FILE_URI),i=c(r.sourceType,Camera.PictureSourceType.CAMERA),m=c(r.targetWidth,-1),n=c(r.targetHeight,-1),p=c(r.encodingType,Camera.EncodingType.JPEG),u=c(r.mediaType,Camera.MediaType.PICTURE),C=!!r.allowEdit,g=!!r.correctOrientation,s=!!r.saveToPhotoAlbum,y=c(r.popoverOptions,null),E=c(r.cameraDirection,Camera.Direction.BACK),d=[t,o,i,m,n,p,u,C,g,s,y,E];exec(e,a,"Camera","takePicture",d)},cameraExport.cleanup=function(e,a){exec(e,a,"Camera","cleanup",[])},module.exports=cameraExport;