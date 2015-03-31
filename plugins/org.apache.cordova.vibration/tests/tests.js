exports.defineAutoTests=function(){describe("Vibration (navigator.notification.vibrate)",function(){it("navigator.notification should exist",function(){expect(navigator.notification).toBeDefined()}),it("should contain a vibrate function",function(){expect(typeof navigator.notification.vibrate).toBeDefined(),expect(typeof navigator.notification.vibrate).toBe("function")})})},exports.defineManualTests=function(t,i){function e(){h=!1}var a,n=function(t,i){var e=document.getElementById("info"),a=document.createElement("div");i&&(a.style.color=i),a.innerHTML=t,e.appendChild(a)},r=function(){var t=document.getElementById("info");t.innerHTML=""},o=function(){r(),navigator.notification.vibrate(2500),n("navigator.notification.vibrate(2500)","green")},c=function(){r(),navigator.notification.vibrateWithPattern([1e3,3e3,2e3,5e3]),n("navigator.notification.vibrateWithPattern([1000, 3000, 2000, 5000])","green")},v=function(){r(),navigator.notification.cancelVibration(),n("navigator.notification.cancelVibration()","green")},s=function(){r(),navigator.vibrate(3e3),n("navigator.vibrate(3000)","green")},d=function(){r(),navigator.vibrate([3e3]),n("navigator.vibrate([3000])","green")},l=function(){r(),navigator.vibrate([1e3,2e3,3e3,2e3,5e3]),n("navigator.vibrate([1000, 2000, 3000, 2000, 5000])","green")},b=function(){r(),navigator.vibrate(0),n("navigator.vibrate(0)","green")},f=function(){r(),navigator.vibrate([]),n("navigator.vibrate([])","green")},u=function(){r(),navigator.vibrate(6e4),h=!0,n("navigator.vibrate(60000)","green"),a=setTimeout(e,6e4)},g=function(){r(),navigator.vibrate([1e3,2e3,3e3,2e3,5e3,2e3,3e4]),h=!0,n("navigator.vibrate([1000, 2000, 3000, 2000, 5000, 2000, 30000])","green"),a=setTimeout(e,45e3)},p=function(){r(),navigator.vibrate(2e4),navigator.vibrate(45e3),h=!0,n("navigator.vibrate(15000)\nnavigator.vibrate(45000)","green"),a=setTimeout(e,45e3)},h=!1,m='<h1>Vibrate Tests</h1><h3>Starred tests only work for Android and Windows. </h3><h3>iOS ignores the time given for a vibrate </h3><div id="vibrate_old"></div>Expected result: Vibrate once for 2.5 seconds.<p/> <div id="vibrateWithPattern_old"></div>Expected result: Pause for 1s, vibrate for 3s, pause for 2s, vibrate for 5s.<p/> <div id="cancelVibrate_old"></div>Expected result: Press once to initiate vibrate for 60 seconds. Press again to cancel vibrate immediately.<p/> <div id="cancelVibrateWithPattern_old"></div>Expected result: Press once to initiate vibrate with pattern for 45s. Press again to cancel vibrate immediately.<p/> <div id="vibrate_int"></div>Expected result: Vibrate once for 3 seconds.<p/> <div id="vibrate_array"></div>Expected result: Vibrate once for 3 seconds.<p/> <div id="vibrate_with_pattern"></div>Expected result: Vibrate for 1s, pause for 2s, vibrate for 3s, pause for 2s, vibrate for 5s.<p/> <div id="cancel_zero"></div>Expected result: Press once to initiate vibrate for 60 seconds. Press again to cancel vibrate immediately.<p/><div id="cancel_array"></div>Expected result: Press once to initiate vibrate for 60 seconds. Press again to cancel vibrate immediately.<p/> <div id="cancelWithPattern_zero"></div>Expected result: Press once to initiate vibrate with pattern for 45s. Press again to cancel vibrate immediately.<p/> <div id="cancelWithPattern_array"></div>Expected result: Press once to initiate vibrate with pattern for 45s. Press again to cancel vibrate immediately.<p/> <div id="cancelMultipleVibrations"></div>Expected result: Press once to initiate two vibrations simultaneously (one for 20s the other for 45s so total of 45s). Press again to cancel both vibrations immediately.';t.innerHTML='<div id="info"></div>'+m,i("Vibrate (Old)",function(){o()},"vibrate_old"),i("* Vibrate with a pattern (Old)",function(){c()},"vibrateWithPattern_old"),i("* Cancel vibration (Old)",function(){h?(v(),e(),clearTimeout(a)):u()},"cancelVibrate_old"),i("* Cancel vibration with pattern (Old)",function(){h?(v(),e(),clearTimeout(a)):g()},"cancelVibrateWithPattern_old"),i("Vibrate with int",function(){s()},"vibrate_int"),i("Vibrate with array",function(){d()},"vibrate_array"),i("* Vibrate with a pattern",function(){l()},"vibrate_with_pattern"),i("* Cancel vibration with 0",function(){h?(b(),e(),clearTimeout(a)):u()},"cancel_zero"),i("* Cancel vibration with []",function(){h?(f(),e(),clearTimeout(a)):u()},"cancel_array"),i("* Cancel vibration with pattern with 0",function(){h?(b(),e(),clearTimeout(a)):g()},"cancelWithPattern_zero"),i("* Cancel vibration with pattern with []",function(){h?(f(),e(),clearTimeout(a)):g()},"cancelWithPattern_array"),i("* Cancel multiple vibrations",function(){h?(b(),e(),clearTimeout(a)):p()},"cancelMultipleVibrations")};