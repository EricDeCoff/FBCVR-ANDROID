!function(o){function n(){}var i=window.PhoneGap||window.Cordova||window.cordova;n.prototype.register=function(o,n,e){console.log("About to register"),i.exec(o,n,"PushPlugin","register",[e])},n.prototype.unregister=function(o,n){i.exec(o,n,"PushPlugin","unregister",[])},n.prototype.setApplicationIconBadgeNumber=function(o,n){i.exec(o,o,"PushPlugin","setApplicationIconBadgeNumber",[{badge:n}])},o.addConstructor(function(){window.plugins||(window.plugins={}),window.plugins.pushNotification=new n})}(window.cordova||window.Cordova||window.PhoneGap);