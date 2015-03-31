navigator.mozL10n.DateTimeFormat=function(){function e(t,a){for(var n=a.match(/(%E.|%O.|%.)/g),o=0;n&&o<n.length;o++){var c="";switch(n[o]){case"%a":c=r("weekday-"+t.getDay()+"-short");break;case"%A":c=r("weekday-"+t.getDay()+"-long");break;case"%b":case"%h":c=r("month-"+t.getMonth()+"-short");break;case"%B":c=r("month-"+t.getMonth()+"-long");break;case"%Eb":c=r("month-"+t.getMonth()+"-genitive");break;case"%I":c=t.getHours()%12||12;break;case"%e":c=t.getDate();break;case"%p":c=r(t.getHours()<12?"time_am":"time_pm");break;case"%c":case"%x":case"%X":var s=r("dateTimeFormat_"+n[o]);s&&!/(%c|%x|%X)/.test(s)&&(c=e(t,s))}a=a.replace(n[o],c||t.toLocaleFormat(n[o]))}return a}function t(e){e=Math.abs(e);var t={},a=["years",31536e3,"months",2592e3,"weeks",604800,"days",86400,"hours",3600,"minutes",60];if(60>e)return{minutes:Math.round(e/60)};for(var r=0,n=a.length;n>r;r+=2){var o=a[r+1];e>=o&&(t[a[r]]=Math.floor(e/o),e-=t[a[r]]*o)}return t}function a(a,n,o){switch(o=o||864e3,a.constructor){case String:a=parseInt(a);break;case Date:a=a.getTime()}var c=(Date.now()-a)/1e3;if(isNaN(c))return r("incorrectDate");if(Math.abs(c)>60&&(c=c>0?Math.ceil(c):Math.floor(c)),c>o)return e(new Date(a),"%x");var s=n?"-short":"-long",i=t(c),u=c>=0?"-ago":"-until";for(var g in i)return r(g+u+s,{value:i[g]})}var r=navigator.mozL10n.get;return{localeDateString:function(t){return e(t,"%x")},localeTimeString:function(t){return e(t,"%X")},localeString:function(t){return e(t,"%c")},localeFormat:e,fromNow:a,relativeParts:t}};