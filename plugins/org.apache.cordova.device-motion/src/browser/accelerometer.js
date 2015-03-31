function start(){exec(function(e){var r=listeners.slice(0);accel=new Acceleration(e.x,e.y,e.z,e.timestamp);for(var n=0,t=r.length;t>n;n++)r[n].win(accel)},function(e){for(var r=listeners.slice(0),n=0,t=r.length;t>n;n++)r[n].fail(e)},"Accelerometer","start",[]),running=!0}function stop(){exec(null,null,"Accelerometer","stop",[]),running=!1}function createCallbackPair(e,r){return{win:e,fail:r}}function removeListeners(e){var r=listeners.indexOf(e);r>-1&&(listeners.splice(r,1),0===listeners.length&&stop())}var argscheck=require("cordova/argscheck"),utils=require("cordova/utils"),exec=require("cordova/exec"),Acceleration=require("./Acceleration"),running=!1,timers={},listeners=[],accel=null,accelerometer={getCurrentAcceleration:function(e,r){argscheck.checkArgs("fFO","accelerometer.getCurrentAcceleration",arguments);var n,t=function(r){removeListeners(n),e(r)},c=function(e){removeListeners(n),r&&r(e)};n=createCallbackPair(t,c),listeners.push(n),running||start()},watchAcceleration:function(e,r,n){argscheck.checkArgs("fFO","accelerometer.watchAcceleration",arguments);var t=n&&n.frequency&&"number"==typeof n.frequency?n.frequency:1e4,c=utils.createUUID(),i=createCallbackPair(function(){},function(e){removeListeners(i),r&&r(e)});return listeners.push(i),timers[c]={timer:window.setInterval(function(){accel&&e(accel)},t),listeners:i},running?accel&&e(accel):start(),devicemotion=new Event("devicemotion"),window.setInterval(function(){window.dispatchEvent(devicemotion)},200),c},clearWatch:function(e){e&&timers[e]&&(window.clearInterval(timers[e].timer),removeListeners(timers[e].listeners),delete timers[e])}};module.exports=accelerometer;