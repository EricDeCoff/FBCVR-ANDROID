function listener(e){var r={};r.x=Math.round(100*(2*Math.random()-1))/100,r.y=Math.round(100*(2*Math.random()-1))/100,r.z=Math.round(100*(2*Math.random()-1))/100,r.timestamp=(new Date).getTime(),e(r),window.removeEventListener("devicemotion",listener,!1)}var Accelerometer={start:function(e){return window.addEventListener("devicemotion",function(){listener(e)},!1)}};module.exports=Accelerometer,require("cordova/exec/proxy").add("Accelerometer",Accelerometer);