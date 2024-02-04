class WebPages{
    static IsGameName(name){
        var list_of_games = [
            "snake"
        ]
        for(var i = 0; i < Pages.list_of_games.length; i++){
            console.log(i);
            if(name == Pages.list_of_games[i])
                return true;
        }
        return false;
    }
}

module.exports = WebPages;