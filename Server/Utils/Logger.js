class Logger{
    static Log(){
        var string = arguments[0];
        for(var i = 1; i < arguments.length; i++){
            string += ", " + arguments[i];
        }
        
        console.log(string);
    }
    
    static Err(){
        var string = arguments[0];
        for(var i = 1; i < arguments.length; i++){
            string += ", " + arguments[i];
        }

        console.error(string);
    }
}

module.exports = Logger;