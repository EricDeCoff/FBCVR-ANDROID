var cordova=require("cordova"),isAlertShowing=!1,alertStack=[];module.exports={alert:function(e,t,n){if(isAlertShowing){var o=function(){module.exports.alert(e,t,n)};return void alertStack.push(o)}isAlertShowing=!0;var i=n[0],r=n[1],a=n[2],s=new Windows.UI.Popups.MessageDialog(i,r);s.commands.append(new Windows.UI.Popups.UICommand(a)),s.showAsync().then(function(){isAlertShowing=!1,e&&e(),alertStack.length&&setTimeout(alertStack.shift(),0)})},confirm:function(e,t,n){if(isAlertShowing){var o=function(){module.exports.confirm(e,t,n)};return void alertStack.push(o)}isAlertShowing=!0;try{var i=n[0],r=n[1],a=n[2],s=new Windows.UI.Popups.MessageDialog(i,r);a.forEach(function(e){s.commands.append(new Windows.UI.Popups.UICommand(e))}),s.showAsync().then(function(t){isAlertShowing=!1;var n=t?a.indexOf(t.label)+1:0;e&&e(n),alertStack.length&&setTimeout(alertStack.shift(),0)})}catch(l){throw isAlertShowing=!1,alertStack.length&&setTimeout(alertStack.shift(),0),l}},beep:function(e,t,n){n=n&&n.length?n:["1"];var o=new Audio("ms-winsoundevent:Notification.Default"),i=parseInt(n[0])||1;o.msAudioCategory="Alerts";var r=function(){i>0?o.play():(o.removeEventListener("ended",r),o=null,e&&e()),i--};o.addEventListener("ended",r),r()}},require("cordova/exec/proxy").add("Notification",module.exports);