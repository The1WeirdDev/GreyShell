export default class Keyboard{
    static Init(listener_object){
        Keyboard.keys = new Uint8Array(400);
        Keyboard.keys.fill(0, 0, Keyboard.keys.length);
        Keyboard.keys_to_update = [];
    }

    static LateUpdate(){
        for(var i = 0; i < Keyboard.keys_to_update.length; i++){
            var key = Keyboard.keys_to_update[i].key;
            if(Keyboard.keys[key] > 1)
                Keyboard.keys[key] = 1;
        }
        Keyboard.keys_to_update.length = 0;
    }

    static IsKeyPressed(keycode){
        if(keycode < 0 || keycode >= Keyboard.keys.length)
            return false;
        return Keyboard.keys[keycode] > 1;
    }
    static IsKeyDown(keycode){
        if(keycode < 0 || keycode >= Keyboard.keys.length)
            return false;
        return Keyboard.keys[keycode] > 0;
    }

    static OnMouseEnter(e){

    }
    static OnFocusLost(){
        Keyboard.keys.fill(0, 0, Keyboard.keys.length);
    }

    static OnKeyPress(e){
        if(e.repeat)return;
        var keycode = e.keyCode;
        if(keycode < 0 || keycode >= Keyboard.keys.length)return;
        Keyboard.keys[keycode] = 2;
        Keyboard.keys_to_update.push({key:keycode});
    }
    
    static OnKeyRelease(e){
        if(e.repeat)return;
        var keycode = e.keyCode;
        if(keycode < 0 || keycode >= Keyboard.keys.length)return;
        Keyboard.keys[keycode] = 0;
    }
}