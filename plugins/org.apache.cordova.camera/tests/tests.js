exports.defineAutoTests=function(){describe("Camera (navigator.camera)",function(){it("should exist",function(){expect(navigator.camera).toBeDefined()}),it("should contain a getPicture function",function(){expect(navigator.camera.getPicture).toBeDefined(),expect("function"==typeof navigator.camera.getPicture).toBe(!0)})}),describe("Camera Constants (window.Camera + navigator.camera)",function(){it("camera.spec.1 window.Camera should exist",function(){expect(window.Camera).toBeDefined()}),it("camera.spec.2 should contain three DestinationType constants",function(){expect(Camera.DestinationType.DATA_URL).toBe(0),expect(Camera.DestinationType.FILE_URI).toBe(1),expect(Camera.DestinationType.NATIVE_URI).toBe(2),expect(navigator.camera.DestinationType.DATA_URL).toBe(0),expect(navigator.camera.DestinationType.FILE_URI).toBe(1),expect(navigator.camera.DestinationType.NATIVE_URI).toBe(2)}),it("camera.spec.3 should contain two EncodingType constants",function(){expect(Camera.EncodingType.JPEG).toBe(0),expect(Camera.EncodingType.PNG).toBe(1),expect(navigator.camera.EncodingType.JPEG).toBe(0),expect(navigator.camera.EncodingType.PNG).toBe(1)}),it("camera.spec.4 should contain three MediaType constants",function(){expect(Camera.MediaType.PICTURE).toBe(0),expect(Camera.MediaType.VIDEO).toBe(1),expect(Camera.MediaType.ALLMEDIA).toBe(2),expect(navigator.camera.MediaType.PICTURE).toBe(0),expect(navigator.camera.MediaType.VIDEO).toBe(1),expect(navigator.camera.MediaType.ALLMEDIA).toBe(2)}),it("camera.spec.5 should contain three PictureSourceType constants",function(){expect(Camera.PictureSourceType.PHOTOLIBRARY).toBe(0),expect(Camera.PictureSourceType.CAMERA).toBe(1),expect(Camera.PictureSourceType.SAVEDPHOTOALBUM).toBe(2),expect(navigator.camera.PictureSourceType.PHOTOLIBRARY).toBe(0),expect(navigator.camera.PictureSourceType.CAMERA).toBe(1),expect(navigator.camera.PictureSourceType.SAVEDPHOTOALBUM).toBe(2)})})},exports.defineManualTests=function(e,t){function a(e){console.log(e),document.getElementById("camera_status").textContent+=(new Date-x)/1e3+": "+e+"\n"}function i(){document.getElementById("camera_status").innerHTML="",document.getElementById("camera_image").src="about:blank";var e=document.getElementById("canvas");e.width=e.height=1,w=null,T=null,E=null}function o(e,t){try{window.atob(e),e="data:image/jpeg;base64,"+e}catch(i){a("URL: "+e.slice(0,100))}w=e;var o=document.getElementById("camera_image"),n=new Date;o.src=e,o.onloadend=function(){a("Image tag load time: "+(new Date-n)),t&&t()}}function n(e){a("Error getting picture: "+(e.code||e))}function r(e){if(o(e),0==w.indexOf("file:")||0==w.indexOf("content:")||0===w.indexOf("ms-appdata:"))resolveLocalFileSystemURI(e,function(e){E=e,s("resolveLocalFileSystemURI()",!0)(e.toURL())},s("resolveLocalFileSystemURI()",!1));else if(0==w.indexOf("data:image/jpeg;base64"));else{var t=w.replace(/^file:\/\/(localhost)?/,"").replace(/%20/g," ");E=new FileEntry("image_name.png",t)}}function l(){i();var e=h();a("Getting picture with options: "+JSON.stringify(e));var t=navigator.camera.getPicture(r,n,e);window.onorientationchange=function(){var e=new CameraPopoverOptions(0,0,100,100,0);t.setPosition(e)}}function c(){function e(){a("upload complete")}function t(e){a("upload failed: "+JSON.stringify(e))}var i=new FileTransfer,o=new FileUploadOptions;o.fileKey="photo",o.fileName="test.jpg",o.mimeType="image/jpeg",i.onprogress=function(e){console.log("progress: "+e.loaded+" of "+e.total)};var n="http://cordova-filetransfer.jitsu.com";i.upload(w,n+"/upload",e,t,o)}function s(e,t){return function(){a("Call to "+e+(t?" success: ":" failed: ")+JSON.stringify([].slice.call(arguments)))}}function d(){function e(e){a("Got file: "+JSON.stringify(e)),T=e;var t=new FileReader;t.onload=function(){a("FileReader.readAsDataURL() - length = "+t.result.length)},t.onerror=s("FileReader.readAsDataURL",!1),t.readAsDataURL(e)}T?e(T):E.file(e,s("FileEntry.file",!1))}function u(){E.getMetadata(s("FileEntry.getMetadata",!0),s("FileEntry.getMetadata",!1)),E.setMetadata(s("FileEntry.setMetadata",!0),s("FileEntry.setMetadata",!1),{"com.apple.MobileBackup":1}),E.getParent(s("FileEntry.getParent",!0),s("FileEntry.getParent",!1)),E.getParent(s("FileEntry.getParent",!0),s("FileEntry.getParent",!1))}function p(){var e=function(e){var t=e.root,a=E.name;E.copyTo(t,"copied_file.png",s("FileEntry.copyTo",!0),s("FileEntry.copyTo",!1)),E.moveTo(t,"moved_file.png",s("FileEntry.moveTo",!0),s("FileEntry.moveTo",!1)),resolveLocalFileSystemURI(t.nativeURL+"moved_file.png",function(e){e.moveTo(t,a,s("FileEntry.moveTo",!0),s("FileEntry.moveTo",!1)),console.log("Cleanup: successfully renamed file back to original name")},function(){console.log("Cleanup: failed to rename file back to original name")}),resolveLocalFileSystemURI(t.nativeURL+"copied_file.png",function(e){e.remove(s("FileEntry.remove",!0),s("FileEntry.remove",!1)),console.log("Cleanup: successfully removed copied file")},function(){console.log("Cleanup: failed to remove copied file")})};window.requestFileSystem(LocalFileSystem.TEMPORARY,0,e,null)}function m(){var e=function(e){e.onwrite=s("FileWriter.write",!0),e.onerror=s("FileWriter.write",!1),e.write("some text!")},t=function(e){e.onwrite=s("FileWriter.truncate",!0),e.onerror=s("FileWriter.truncate",!1),e.truncate(10)};E.createWriter(e,s("FileEntry.createWriter",!1)),E.createWriter(t,null)}function f(){var e=document.getElementById("canvas"),t=document.getElementById("camera_image"),a=t.width,i=t.height;i=100/a*i,a=100,e.width=a,e.height=i;var o=e.getContext("2d");o.drawImage(t,0,0,a,i)}function g(){E.remove(s("FileEntry.remove",!0),s("FileEntry.remove",!1))}function v(e){i(),window.setTimeout(function(){y(e)},0)}function y(e){if(!e.value)return void alert("No file selected.");if(T=e.files[0],!T)return void alert("Got value but no file.");var t=window.URL||window.webkitURL;if(t){var i=t.createObjectURL(T);i?o(i,function(){t.revokeObjectURL(i)}):a("URL.createObjectURL returned null")}else a("URL.createObjectURL() not supported.")}function h(){for(var e,t=document.querySelectorAll("#image-options select"),a={},i=0;e=t[i];++i){var o=e.value;""!==o&&(a[e.getAttribute("name")]=e.isBool?!!+o:+o)}return a}function b(e,t,a){var i='<div style="display: inline-block">'+e+": ",o="<select name="+e+">",n="";void 0==a&&(n='<option value="">default</option>');var r="";"boolean"==typeof t&&(t={"true":1,"false":0});for(var l in t){var c="";a&&a[0]==l&&(c="selected"),r+='<option value="'+t[l]+'" '+c+">"+l+"</option>"}var s="</select></div>";return i+o+n+r+s}var w=(cordova.require("cordova/platform").id,null),T=null,E=null,x=+new Date,F=["50",50],R=["FILE_URI",1],C=["CAMERA",1],A=["allowEdit",!1],I=["JPEG",0],L=["mediaType",0],P=["correctOrientation",!1],B=["saveToPhotoAlbum",!0],S='<h1>Camera</h1><div id="info"><b>Status:</b> <div id="camera_status"></div>img: <img width="100" id="camera_image">canvas: <canvas id="canvas" width="1" height="1"></canvas></div>',U='<h2>Cordova Camera API Options</h2><div id="image-options">'+b("sourceType",Camera.PictureSourceType,C)+b("destinationType",Camera.DestinationType,R)+b("encodingType",Camera.EncodingType,I)+b("mediaType",Camera.MediaType,L)+b("quality",{0:0,50:50,80:80,100:100},F)+b("targetWidth",{50:50,200:200,800:800,2048:2048})+b("targetHeight",{50:50,200:200,800:800,2048:2048})+b("allowEdit",!0,A)+b("correctOrientation",!0,P)+b("saveToPhotoAlbum",!0,B)+b("cameraDirection",Camera.Direction)+"</div>",O='<div id="getpicture"></div>',D='<h4>Recommended Test Procedure</h4>Options not specified should be the default value<br>Status box should update with image and info whenever an image is taken or selected from library</p><div style="background:#B0C4DE;border:1px solid #FFA07A;margin:15px 6px 0px;min-width:295px;max-width:97%;padding:4px 0px 2px 10px;min-height:160px;max-height:200px;overflow:auto"><ol> <li>All default options. Should be able to edit once picture is taken and will be saved to library.</li></p><li>sourceType=PHOTOLIBRARY<br>Should be able to see picture that was just taken in previous test and edit when selected</li></p><li>sourceType=Camera<br>allowEdit=false<br>saveToPhotoAlbum=false<br>Should not be able to edit when taken and will not save to library</li></p><li>encodingType=PNG<br>allowEdit=true<br>saveToPhotoAlbum=true<br>cameraDirection=FRONT<br>Should bring up front camera. Verify in status box info URL that image is encoded as PNG.</li></p><li>sourceType=SAVEDPHOTOALBUM<br>mediaType=VIDEO<br>Should only be able to select a video</li></p><li>sourceType=SAVEDPHOTOALBUM<br>mediaType=PICTURE<br>allowEdit=false<br>Should only be able to select a picture and not edit</li></p><li>sourceType=PHOTOLIBRARY<br>mediaType=ALLMEDIA<br>allowEdit=true<br>Should be able to select pics and videos and edit picture if selected</li></p><li>sourceType=CAMERA<br>targetWidth & targetHeight=50<br>allowEdit=false<br>Do Get File Metadata test below and take note of size<br>Repeat test but with width and height=800. Size should be significantly larger.</li></p><li>quality=0<br>targetWidth & targetHeight=default<br>allowEdit=false<br>Do Get File Metadata test below and take note of size<br>Repeat test but with quality=80. Size should be significantly larger.</li></ol></div>',M='<h2>Native File Inputs</h2>For the following tests, status box should update with file selected</p><div>input type=file <input type="file" class="testInputTag"></div><div>capture=camera <input type="file" accept="image/*;capture=camera" class="testInputTag"></div><div>capture=camcorder <input type="file" accept="video/*;capture=camcorder" class="testInputTag"></div><div>capture=microphone <input type="file" accept="audio/*;capture=microphone" class="testInputTag"></div>',_='<h2>Actions</h2>For the following tests, ensure that an image is set in status box</p><div id="metadata"></div>Expected result: Get metadata about file selected.<br>Status box will show, along with the metadata, "Call to FileEntry.getMetadata success, Call to FileEntry.setMetadata success, Call to FileEntry.getParent success"</p><div id="reader"></div>Expected result: Read contents of file.<br>Status box will show "Got file: {some metadata}, FileReader.readAsDataURL() - length = someNumber"</p><div id="copy"></div>Expected result: Copy image to new location and move file to different location.<br>Status box will show "Call to FileEntry.copyTo success:{some metadata}, Call to FileEntry.moveTo success:{some metadata}"</p><div id="write"></div>Expected result: Write image to library.<br>Status box will show "Call to FileWriter.write success:{some metadata}, Call to FileWriter.truncate success:{some metadata}"</p><div id="upload"></div>Expected result: Upload image to server.<br>Status box may print out progress. Once finished will show "upload complete"</p><div id="draw_canvas"></div>Expected result: Display image using canvas.<br>Image will be displayed in status box under "canvas:"</p><div id="remove"></div>Expected result: Remove image from library.<br>Status box will show "FileEntry.remove success:["OK"]';window.MSApp&&window.MSApp.execUnsafeLocalFunction?MSApp.execUnsafeLocalFunction(function(){e.innerHTML=S+U+O+D+M+_}):e.innerHTML=S+U+O+D+M+_;for(var G=document.getElementsByClassName("testInputTag"),N=function(e){v(e.target)},k=0;k<G.length;++k){var H=G[k];H.addEventListener("change",N,!1)}t("Get picture",function(){l()},"getpicture"),t("Clear Status",function(){i()},"getpicture"),t("Get File Metadata",function(){u()},"metadata"),t("Read with FileReader",function(){d()},"reader"),t("Copy Image",function(){p()},"copy"),t("Write Image",function(){m()},"write"),t("Upload Image",function(){c()},"upload"),t("Draw Using Canvas",function(){f()},"draw_canvas"),t("Remove Image",function(){g()},"remove")};