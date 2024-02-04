class Logger{
    static Log(){
        var string = "";
        for(var i = 0; i < arguments.length; i++){
            string += arguments[i] + ", ";
        }

        console.log(string);
    }
}
module.exports = Logger;