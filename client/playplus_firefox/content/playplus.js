
var userid = "christoph.dorn"
//has to be compiled into the file when downloaded!
//in this way design changes by facebook won't affect user identification

var server1="http://127.0.0.1/projects/playplus/server/util.js.php";
//maybe there should be a more dynamic solution i.e. a possibilty for changing this remotely

//two functions that will be injected into fb:
function p_ajax(http_url){
    if(window.XMLHttpRequest) {
      xmlhttp=new XMLHttpRequest();
      if(xmlhttp.overrideMimeType)
      {
          xmlhttp.overrideMimeType('text/xml');
      }
    }
    else if(window.ActiveXObject) {
      try {
          xmlhttp=new ActiveXObject("Msxml2.XMLHTTP");
      }
      catch(e) {
          try {
              xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
          }
          catch(e){}
      }
    }
    if(!xmlhttp) {
      alert('Cannot create an XMLHTTP instance');
      return false;
    }
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState==4) {
          eval(xmlhttp.responseText);
      }
    }
    xmlhttp.open('GET',http_url,true);
    xmlhttp.send(null);
}
function p_displayBasicLoadingScreen() {
    var p_load_div = document.createElement("div");
    p_load_div.setAttribute("style","position: fixed; left: 5px; bottom: 5px; background: #FFF; " +
        "opacity: .3; font-family: Tahoma; color:#222; font-size: 10px;");
    p_load_div.innerHTML = "loading play+";
    window.document.body.appendChild(p_load_div);
}

//playplus object (that does all the framework)
//based on greasemonkey, used under GPL permission
var playplus = {
    isGreasemonkeyable: function(url) {
        var scheme=Components.classes["@mozilla.org/network/io-service;1"]
            .getService(Components.interfaces.nsIIOService)
            .extractScheme(url);
        return (
            (scheme == "http" || scheme == "https" || scheme == "file") &&
            !/hiddenWindow\.html$/.test(url)
        );
    },

    contentLoad: function(e) {
        var unsafeWin=e.target.defaultView;
        if (unsafeWin.wrappedJSObject) unsafeWin=unsafeWin.wrappedJSObject;

        var unsafeLoc=new XPCNativeWrapper(unsafeWin, "location").location;
        var href=new XPCNativeWrapper(unsafeLoc, "href").href;
        //every content ever loading in firefox will reach this if clause
        if (playplus.isGreasemonkeyable(href)
            && ( /^http:\/\/.*\.facebook\.com\/.*$/.test(href) || /^https:\/\/.*\.facebook\.com\/.*$/.test(href))
            && true
        ) {
            //so from here we go with facebook pages only
            //let's check for an iframe and then proceed
            if(unsafeWin.top === unsafeWin.self) {
                playplus.injectScript(href, unsafeWin);
            }
        }
    },

    injectScript: function(url, unsafeContentWin) {
        var p_baseScript, p_prefScript;
        var safeWin=new XPCNativeWrapper(unsafeContentWin);

        //To do: update server1 url dynamically: load, upadte, save into firefox preferences
        //maybe also allow a small script to be executed additionally to the xmlHttp Request
        var p_prefScript = ""

        

        //inject into facebook
        try {
            var p_baseScript = p_ajax.toString() + p_displayBasicLoadingScreen.toString();
            p_baseScript +=  "console.log('starting PLAY+'); p_ajax('"+server1+"'); p_displayBasicLoadingScreen()";
            var scriptnode = safeWin.document.createElement("script");
            scriptnode.innerHTML = p_baseScript;
            safeWin.document.body.appendChild(scriptnode);
        } catch(e) {
            var e2=new Error(typeof e=="string" ? e : e.message);
            alert(e2);
        }
    },

    onLoad: function() {
        var	appcontent=window.document.getElementById("appcontent");
        if (appcontent && !appcontent.greased_playplus_gmCompiler) {
            appcontent.greased_playplus_gmCompiler=true;
            appcontent.addEventListener("DOMContentLoaded", playplus.contentLoad, false);
        }
    },

    onUnLoad: function() {
        //remove now unnecessary listeners
        window.removeEventListener('load', playplus.onLoad, false);
        window.removeEventListener('unload', playplus.onUnLoad, false);
        window.document.getElementById("appcontent")
            .removeEventListener("DOMContentLoaded", playplus.contentLoad, false);
    }

}; //object playplus_gmCompiler

window.addEventListener('load', playplus.onLoad, false);
window.addEventListener('unload', playplus.onUnLoad, false);
