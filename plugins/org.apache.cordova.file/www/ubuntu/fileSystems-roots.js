var fsMap=null,FileSystem=require("./FileSystem"),LocalFileSystem=require("./LocalFileSystem"),exec=require("cordova/exec"),requestFileSystem=function(e,s,t){var i=function(e){e&&t&&(fs=new FileSystem(e.name,e.root),t(fs))};exec(i,null,"File","requestFileSystem",[e,s])};require("./fileSystems").getFs=function(e,s){fsMap?s(fsMap[e]):requestFileSystem(LocalFileSystem.PERSISTENT,1,function(t){requestFileSystem(LocalFileSystem.TEMPORARY,1,function(i){fsMap={},fsMap[i.name]=i,fsMap[t.name]=t,s(fsMap[e])})})};