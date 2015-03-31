function defineEvent(e){utils.defineGetterSetter(FileReader.prototype,e,function(){return this._realReader[e]||null},function(r){this._realReader[e]=r})}function initRead(e,r){if(e.readyState==FileReader.LOADING)throw new FileError(FileError.INVALID_STATE_ERR);return e._result=null,e._error=null,e._readyState=FileReader.LOADING,"string"!=typeof r.localURL?(e._localURL="",!0):(e._localURL=r.localURL,void(e.onloadstart&&e.onloadstart(new ProgressEvent("loadstart",{target:e}))))}var exec=require("cordova/exec"),modulemapper=require("cordova/modulemapper"),utils=require("cordova/utils"),File=require("./File"),FileError=require("./FileError"),ProgressEvent=require("./ProgressEvent"),origFileReader=modulemapper.getOriginalSymbol(window,"FileReader"),FileReader=function(){this._readyState=0,this._error=null,this._result=null,this._localURL="",this._realReader=origFileReader?new origFileReader:{}};FileReader.EMPTY=0,FileReader.LOADING=1,FileReader.DONE=2,utils.defineGetter(FileReader.prototype,"readyState",function(){return this._localURL?this._readyState:this._realReader.readyState}),utils.defineGetter(FileReader.prototype,"error",function(){return this._localURL?this._error:this._realReader.error}),utils.defineGetter(FileReader.prototype,"result",function(){return this._localURL?this._result:this._realReader.result}),defineEvent("onloadstart"),defineEvent("onprogress"),defineEvent("onload"),defineEvent("onerror"),defineEvent("onloadend"),defineEvent("onabort"),FileReader.prototype.abort=function(){return origFileReader&&!this._localURL?this._realReader.abort():(this._result=null,void(this._readyState!=FileReader.DONE&&this._readyState!=FileReader.EMPTY&&(this._readyState=FileReader.DONE,"function"==typeof this.onabort&&this.onabort(new ProgressEvent("abort",{target:this})),"function"==typeof this.onloadend&&this.onloadend(new ProgressEvent("loadend",{target:this})))))},FileReader.prototype.readAsText=function(e,r){if(initRead(this,e))return this._realReader.readAsText(e,r);var t=r?r:"UTF-8",o=this,n=[this._localURL,t,e.start,e.end];exec(function(e){o._readyState!==FileReader.DONE&&(o._readyState=FileReader.DONE,o._result=e,"function"==typeof o.onload&&o.onload(new ProgressEvent("load",{target:o})),"function"==typeof o.onloadend&&o.onloadend(new ProgressEvent("loadend",{target:o})))},function(e){o._readyState!==FileReader.DONE&&(o._readyState=FileReader.DONE,o._result=null,o._error=new FileError(e),"function"==typeof o.onerror&&o.onerror(new ProgressEvent("error",{target:o})),"function"==typeof o.onloadend&&o.onloadend(new ProgressEvent("loadend",{target:o})))},"File","readAsText",n)},FileReader.prototype.readAsDataURL=function(e){if(initRead(this,e))return this._realReader.readAsDataURL(e);var r=this,t=[this._localURL,e.start,e.end];exec(function(e){r._readyState!==FileReader.DONE&&(r._readyState=FileReader.DONE,r._result=e,"function"==typeof r.onload&&r.onload(new ProgressEvent("load",{target:r})),"function"==typeof r.onloadend&&r.onloadend(new ProgressEvent("loadend",{target:r})))},function(e){r._readyState!==FileReader.DONE&&(r._readyState=FileReader.DONE,r._result=null,r._error=new FileError(e),"function"==typeof r.onerror&&r.onerror(new ProgressEvent("error",{target:r})),"function"==typeof r.onloadend&&r.onloadend(new ProgressEvent("loadend",{target:r})))},"File","readAsDataURL",t)},FileReader.prototype.readAsBinaryString=function(e){if(initRead(this,e))return this._realReader.readAsBinaryString(e);var r=this,t=[this._localURL,e.start,e.end];exec(function(e){r._readyState!==FileReader.DONE&&(r._readyState=FileReader.DONE,r._result=e,"function"==typeof r.onload&&r.onload(new ProgressEvent("load",{target:r})),"function"==typeof r.onloadend&&r.onloadend(new ProgressEvent("loadend",{target:r})))},function(e){r._readyState!==FileReader.DONE&&(r._readyState=FileReader.DONE,r._result=null,r._error=new FileError(e),"function"==typeof r.onerror&&r.onerror(new ProgressEvent("error",{target:r})),"function"==typeof r.onloadend&&r.onloadend(new ProgressEvent("loadend",{target:r})))},"File","readAsBinaryString",t)},FileReader.prototype.readAsArrayBuffer=function(e){if(initRead(this,e))return this._realReader.readAsArrayBuffer(e);var r=this,t=[this._localURL,e.start,e.end];exec(function(e){r._readyState!==FileReader.DONE&&(r._readyState=FileReader.DONE,r._result=e,"function"==typeof r.onload&&r.onload(new ProgressEvent("load",{target:r})),"function"==typeof r.onloadend&&r.onloadend(new ProgressEvent("loadend",{target:r})))},function(e){r._readyState!==FileReader.DONE&&(r._readyState=FileReader.DONE,r._result=null,r._error=new FileError(e),"function"==typeof r.onerror&&r.onerror(new ProgressEvent("error",{target:r})),"function"==typeof r.onloadend&&r.onloadend(new ProgressEvent("loadend",{target:r})))},"File","readAsArrayBuffer",t)},module.exports=FileReader;