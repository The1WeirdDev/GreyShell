class Mime{
    static GetMimeFromURL(url){
        if(url.endsWith(".html"))
            return "text/html";
        else if(url.endsWith(".js"))
            return "text/javscript";
        else if(url.endsWith(".css"))
            return "text/css";
        else if(url.endsWith(".json"))
            return "application/json";
        else if(url.endsWith(".mp3"))
            return "audio/mpeg";
        else if(url.endsWith(".ttf"))
            return "font/ttf";
        else if(url.endsWith(".txt"))
            return "text/plain";
        else
            return "text";
    }
}

module.exports = Mime;