var argscheck=require("cordova/argscheck"),exec=require("cordova/exec"),GlobalizationError=require("./GlobalizationError"),globalization={getPreferredLanguage:function(e,a){argscheck.checkArgs("fF","Globalization.getPreferredLanguage",arguments),exec(e,a,"Globalization","getPreferredLanguage",[])},getLocaleName:function(e,a){argscheck.checkArgs("fF","Globalization.getLocaleName",arguments),exec(e,a,"Globalization","getLocaleName",[])},dateToString:function(e,a,t,n){argscheck.checkArgs("dfFO","Globalization.dateToString",arguments);var r=e.valueOf();exec(a,t,"Globalization","dateToString",[{date:r,options:n}])},stringToDate:function(e,a,t,n){argscheck.checkArgs("sfFO","Globalization.stringToDate",arguments),exec(a,t,"Globalization","stringToDate",[{dateString:e,options:n}])},getDatePattern:function(e,a,t){argscheck.checkArgs("fFO","Globalization.getDatePattern",arguments),exec(e,a,"Globalization","getDatePattern",[{options:t}])},getDateNames:function(e,a,t){argscheck.checkArgs("fFO","Globalization.getDateNames",arguments),exec(e,a,"Globalization","getDateNames",[{options:t}])},isDayLightSavingsTime:function(e,a,t){argscheck.checkArgs("dfF","Globalization.isDayLightSavingsTime",arguments);var n=e.valueOf();exec(a,t,"Globalization","isDayLightSavingsTime",[{date:n}])},getFirstDayOfWeek:function(e,a){argscheck.checkArgs("fF","Globalization.getFirstDayOfWeek",arguments),exec(e,a,"Globalization","getFirstDayOfWeek",[])},numberToString:function(e,a,t,n){argscheck.checkArgs("nfFO","Globalization.numberToString",arguments),exec(a,t,"Globalization","numberToString",[{number:e,options:n}])},stringToNumber:function(e,a,t,n){argscheck.checkArgs("sfFO","Globalization.stringToNumber",arguments),exec(a,t,"Globalization","stringToNumber",[{numberString:e,options:n}])},getNumberPattern:function(e,a,t){argscheck.checkArgs("fFO","Globalization.getNumberPattern",arguments),exec(e,a,"Globalization","getNumberPattern",[{options:t}])},getCurrencyPattern:function(e,a,t){argscheck.checkArgs("sfF","Globalization.getCurrencyPattern",arguments),exec(a,t,"Globalization","getCurrencyPattern",[{currencyCode:e}])}};module.exports=globalization;