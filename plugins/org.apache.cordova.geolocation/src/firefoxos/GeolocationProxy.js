var idsMap={};module.exports={getLocation:function(o,a,e){function i(a){o(a.coords)}var r=cordova.require("cordova/modulemapper").getOriginalSymbol(window,"navigator.geolocation");r.getCurrentPosition(i,a,{enableHighAccuracy:e[0],maximumAge:e[1]})},addWatch:function(o,a,e){var i=cordova.require("cordova/modulemapper").getOriginalSymbol(window,"navigator.geolocation"),r=e[0],c=i.watchPosition(o,a,{enableHighAccuracy:e[1]});idsMap[r]=c},clearWatch:function(o,a,e){var i=cordova.require("cordova/modulemapper").getOriginalSymbol(window,"navigator.geolocation"),r=e[0];r in idsMap&&(i.clearWatch(idsMap[r]),delete idsMap[r]),o&&o()}},require("cordova/exec/proxy").add("Geolocation",module.exports);