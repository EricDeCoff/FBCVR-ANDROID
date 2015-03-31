function ensureLocator(){return null==loc&&(loc=new Windows.Devices.Geolocation.Geolocator),loc}function createErrorCode(){switch(loc.locationStatus){case Windows.Devices.Geolocation.PositionStatus.initializing:case Windows.Devices.Geolocation.PositionStatus.noData:case Windows.Devices.Geolocation.PositionStatus.notInitialized:case Windows.Devices.Geolocation.PositionStatus.notAvailable:return PositionError.POSITION_UNAVAILABLE;case Windows.Devices.Geolocation.PositionStatus.disabled:return PositionError.PERMISSION_DENIED}}function createResult(o){var e={accuracy:o.coordinate.accuracy,heading:o.coordinate.heading,velocity:o.coordinate.speed,altitudeAccuracy:o.coordinate.altitudeAccuracy,timestamp:o.coordinate.timestamp};return o.coordinate.point?(e.latitude=o.coordinate.point.position.latitude,e.longitude=o.coordinate.point.position.longitude,e.altitude=o.coordinate.point.position.altitude):(e.latitude=o.coordinate.latitude,e.longitude=o.coordinate.longitude,e.altitude=o.coordinate.altitude),e}var PositionError=require("./PositionError"),ids={},loc;module.exports={getLocation:function(o,e,i){if(ensureLocator(),null!=loc){var t=i[0],n=i[1];loc.desiredAccuracy=t?Windows.Devices.Geolocation.PositionAccuracy.high:Windows.Devices.Geolocation.PositionAccuracy.default,loc.reportInterval=n?n:0,loc.getGeopositionAsync().then(function(e){o(createResult(e))},function(o){e({code:createErrorCode(),message:o.message})})}else e({code:PositionError.POSITION_UNAVAILABLE,message:"You do not have the required location services present on your system."})},addWatch:function(o,e,i){ensureLocator();var t=i[0],n=i[1],c=function(e){o(createResult(e.position),{keepCallback:!0})},a=function(o){switch(o.status){case Windows.Devices.Geolocation.PositionStatus.noData:case Windows.Devices.Geolocation.PositionStatus.notAvailable:e({code:PositionError.POSITION_UNAVAILABLE,message:"Data from location services is currently unavailable or you do not have the required location services present on your system."});break;case Windows.Devices.Geolocation.PositionStatus.disabled:e({code:PositionError.PERMISSION_DENIED,message:"Your location is currently turned off."});break;case Windows.Devices.Geolocation.PositionStatus.initializing:case Windows.Devices.Geolocation.PositionStatus.ready:}};loc.desiredAccuracy=n?Windows.Devices.Geolocation.PositionAccuracy.high:Windows.Devices.Geolocation.PositionAccuracy.default,"windows"==cordova.platformId&&WinJS.Utilities.isPhone&&(loc.movementThreshold=loc.movementThreshold||1),loc.addEventListener("positionchanged",c),loc.addEventListener("statuschanged",a),ids[t]={pos:c,status:a}},clearWatch:function(o,e,i){var t=i[0],n=ids[t];n&&(loc.removeEventListener("positionchanged",n.pos),loc.removeEventListener("statuschanged",n.status),delete ids[t]),o&&o()}},require("cordova/exec/proxy").add("Geolocation",module.exports);