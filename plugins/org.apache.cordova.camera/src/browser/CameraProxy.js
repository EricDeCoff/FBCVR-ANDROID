function takePicture(e,t,a){if(a&&1===a[2])capture(e,t);else{var r=document.createElement("input");r.type="file",r.name="files[]",r.onchange=function(t){var a=(document.createElement("canvas"),new FileReader);a.onload=function(t){r.parentNode.removeChild(r);var a=t.target.result;return e(a.substr(a.indexOf(",")+1))},a.readAsDataURL(t.target.files[0])},document.body.appendChild(r)}}function capture(e,t){var a,r=document.createElement("video"),n=document.createElement("button");r.width=320,r.height=240,n.innerHTML="Capture!",n.onclick=function(){var t=document.createElement("canvas");t.getContext("2d").drawImage(r,0,0,320,240);var o=t.toDataURL("img/png");return o=o.replace("data:image/png;base64,",""),a.stop(),r.parentNode.removeChild(r),n.parentNode.removeChild(n),e(o)},navigator.getUserMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia;var o=function(e){a=e,r.src=window.URL.createObjectURL(a),r.play(),document.body.appendChild(r),document.body.appendChild(n)};navigator.getUserMedia?navigator.getUserMedia({video:!0,audio:!0},o,t):alert("Browser does not support camera :(")}module.exports={takePicture:takePicture,cleanup:function(){}},require("cordova/exec/proxy").add("Camera",module.exports);