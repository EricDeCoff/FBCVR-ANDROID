var idsMap={},geo=cordova.require("cordova/modulemapper").getOriginalSymbol(window,"navigator.geolocation");module.exports={getLocation:function(o,a,e){var i=function(a){var e=a.coords;e.timestamp=a.timestamp,o&&o(e)};geo.getCurrentPosition(i,a,{enableHighAccuracy:e[0],maximumAge:e[1]})},addWatch:function(o,a,e){var i=e[0],t=function(a){var e=a.coords;e.timestamp=a.timestamp,o&&o(e)},r=geo.watchPosition(t,a,{enableHighAccuracy:e[1]});idsMap[i]=r},clearWatch:function(o,a,e){var i=e[0];i in idsMap&&(geo.clearWatch(idsMap[i]),delete idsMap[i]),o&&o()}},require("cordova/exec/proxy").add("Geolocation",module.exports);