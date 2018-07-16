
// Authentication ???
function authenticate(){
   
}




// http request ???
function httpGet(theUrl){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function(){
        if(xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHtpp.responsesText);
    }
    xmlHttp.open("GET", theUrl, true);
    xmlHttp.send(null);
}

